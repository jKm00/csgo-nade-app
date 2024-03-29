import type { Nade, NadeType } from '$lib/features/stratEditor/types/nade';
import type { SupabaseClient } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';

export const GET = async ({ request, locals }) => { 
	const [_, params] = request.url.split('?');
	const urlParams = new URLSearchParams(params);

	const map = urlParams.get('map') ?? null;
	const position = urlParams.get('position') ?? null;
	const side = urlParams.get('side') ?? null;
	const strat = urlParams.get('stratName') ?? null;
	const team = urlParams.get('teamName') ?? null;
	const author = urlParams.get('author') ?? null;

	const from = urlParams.get('from') ?? '0';
	const to = urlParams.get('to') ?? '11';

	const { data, error } = await locals.supabase.rpc('query_strats_with_filters', {
		p_map: map,
		p_strat_position: position,
		p_side: side,
		p_strat_name: strat,
		p_team_name: team,
		p_author: author,
	}).range(Number(from), Number(to));

	if (error) {
		console.error(error);
		return new Response('Something went wrong. Please try again!', { status: 500 });
	};

	return json(data);
}

export const POST = async ({ request, locals }) => {
	const session = await locals.getSession();

	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}

	const form = await request.formData();

	const name = form.get('name') as unknown as string;
	const descripiton = form.get('description') as unknown as string;
	const mapId = form.get('mapId') as unknown as string;
	const side = form.get('side') as unknown as string;
	const positionId = form.get('positionId') as unknown as string;
	const privacy = form.get('privacy') as unknown as string;
	const teamId = form.get('teamId') as unknown as string;
	const playerId = form.get('playerId') as unknown as string;

	const { stratId, error } = await createStrat(
		locals.supabase,
		name,
		descripiton,
		mapId,
		side,
		positionId,
		privacy,
		teamId,
		playerId
	);

	if (error) {
		console.error('Create strat error:', error);
		return new Response('Something went wrong. Please try again!', {
			status: 400,
		});
	}

	const numberOfNades = form.get('numberOfNades') as unknown as number;
	let nades: Nade[] = [];
	for (let i = 0; i < numberOfNades; i++) {
		// Extract all nade info
		const nadeName = form.get(`nadeName${i}`) as unknown as string;
		const nadeNotes = form.get(`nadeNotes${i}`) as unknown as string;
		const nadeType = form.get(`nadeType${i}`) as unknown as NadeType;
		const nadeLineupX = form.get(`nadeLineupX${i}`) as unknown as number;
		const nadeLineupY = form.get(`nadeLineupY${i}`) as unknown as number;
		const nadeImpactX = form.get(`nadeImpactX${i}`) as unknown as number;
		const nadeImpactY = form.get(`nadeImpactY${i}`) as unknown as number;
		const lineupImg = form.get(`nadeLineupImg${i}`) as unknown as File;
		const impactImg = form.get(`nadeImpactImg${i}`) as unknown as File;

		nades = [
			...nades,
			{
				id: i,
				name: nadeName,
				notes: nadeNotes,
				type: nadeType,
				lineupX: nadeLineupX,
				lineupY: nadeLineupY,
				impactX: nadeImpactX,
				impactY: nadeImpactY,
				lineupImg: lineupImg,
				impactImg: impactImg,
			},
		];
	}

	for (var nade of nades) {
		// Upload lineup img
		const { imgUrl: lineupImgUrl, error: lineupError } = await uploadImg(
			locals.supabase,
			stratId!,
			nade.lineupImg,
			'LINEUP'
		);

		if (lineupError) {
			console.log('Failed to upload lineup image: ', lineupError);
		}

		// Upload impact img
		const { imgUrl: impactImgUrl, error: impactError } = await uploadImg(
			locals.supabase,
			stratId!,
			nade.impactImg,
			'IMPACT'
		);

		if (impactError) {
			console.log('Failed to upload impact image:', impactError);
		}

		// Insert nade
		const { error } = await locals.supabase.from('nades').insert({
			name: nade.name,
			notes: nade.notes,
			type: `${nade.type}`,
			lineup_x: nade.lineupX,
			lineup_y: nade.lineupY,
			impact_x: nade.impactX ?? 0,
			impact_y: nade.impactY ?? 0,
			strat_id: stratId!,
			lineup_img: lineupImgUrl,
			impact_img: impactImgUrl,
		});

		if (error) {
			console.log('Failed to insert nade into db:', error);
		}
	}

	return new Response(JSON.stringify(stratId!), { status: 200 });
};

const createStrat = async (
	supabase: SupabaseClient,
	name: string,
	description: string,
	mapId: string,
	side: string,
	positionId: string,
	privacy: string,
	teamId: string,
	playerId: string
) => {
	let stratId: number | undefined = undefined;
	let error: string | undefined = undefined;

	if (
		name === '' ||
		mapId === '' ||
		side === '' ||
		positionId === '' ||
		privacy === '' ||
		teamId === '' ||
		playerId === ''
	) {
		error = 'Invalid fields';
	}

	const { data, error: err } = await supabase
		.from('strats')
		.insert({
			name,
			description,
			privacy,
			map_id: mapId,
			team_id: teamId ? Number(teamId) : null,
			author_id: playerId,
			position_id: Number(positionId),
			team_side: side,
		})
		.select('id')
		.single();

	if (err) {
		error = err.message;
	} else {
		stratId = data.id;
	}

	return {
		stratId,
		error,
	};
};

const uploadImg = async (
	supabase: SupabaseClient,
	stratId: number,
	img: File | undefined,
	type: 'LINEUP' | 'IMPACT'
) => {
	let imgUrl: string | undefined = undefined;
	let error: { status: number; message: string } | undefined = undefined;

	if (!img) {
		error = { status: 400, message: 'No image' };
	}

	if (img) {
		const { data, error: err } = await supabase.storage
			.from('strats')
			.upload(`${stratId}/${type}-${img.name}`, img, {
				upsert: true,
			});

		if (err) {
			error = { status: 500, message: `Failed to upload image; ${img.name}` };
		}

		if (data) {
			imgUrl = data?.path;
		}
	}

	return {
		imgUrl,
		error,
	};
};
