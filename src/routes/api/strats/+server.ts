import type { Nade, NadeType } from '$lib/features/stratEditor/types/nade';

export const POST = async ({ request }) => {
	const form = await request.formData();

	const name = form.get('name');
	const descripiton = form.get('description');
	const map = form.get('map');
	const side = form.get('side');
	const position = form.get('position');
	const privacy = form.get('privacy');
	const team = form.get('team');

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
				impactPointX: nadeImpactX,
				impactPointY: nadeImpactY,
				lineupImg: lineupImg,
				impactImg: impactImg,
			},
		];
	}

	console.log(nades);

	// Create strat

	// Create nades

	// Upload images

	return new Response('OK', { status: 200 });
};
