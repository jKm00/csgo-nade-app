import type Nade from '$lib/components/containers/Nade.svelte';
import { stratSchema } from '$lib/validations/zodShemas';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ url, locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(302, '/login?redirectTo=/strats');
	}

	const { data: maps } = await locals.supabase
		.from('maps')
		.select('id, name, radar, positions ( id, name )');
	const { data: teams } = await locals.supabase
		.from('profile_teams')
		.select('team_id, team_name')
		.eq('profile_uuid', session.user.id);

	return {
		maps: maps.map((map) => {
			return {
				...map,
				positions: map.positions.map((position) => {
					return {
						id: position.id,
						name: position.name,
					};
				}),
			};
		}),
		teams,
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();

		const name = form.get('name');
		const desc = form.get('description');
		const mapId = form.get('mapId');
		const mapName = form.get('mapName');
		const teamSide = form.get('teamSide');
		const positionId = form.get('positionId');
		const privacy = form.get('privacy');
		const teamId = form.get('teamId');
		const nadesString = form.get('nades');
		const playerId = form.get('playerId');

		if (
			name === '' ||
			desc === '' ||
			mapId === '' ||
			teamSide === '' ||
			mapName === '' ||
			positionId === '' ||
			privacy === '' ||
			nadesString === null ||
			nadesString === '' ||
			playerId === ''
		) {
			return fail(400, {
				message: 'Something went wrong. Please try again!',
			});
		}

		const { data, error } = await locals.supabase
			.from('strats')
			.insert({
				name,
				description: desc,
				privacy: privacy,
				map_id: mapId,
				author_id: playerId,
				team_id: teamId === '' ? null : teamId,
				position_id: positionId,
				team_side: teamSide,
			})
			.select('id');

		if (error) {
			console.log(error);
			return fail(400, {
				message: 'Something went wrong. Please try again later!',
			});
		}

		const nades = JSON.parse(`${nadesString}`);
		const nadesForInsert = nades.map((nade: Nade) => {
			return {
				name: nade.name,
				type: nade.type,
				lineup_x: nade.lineupX,
				lineup_y: nade.lineupY,
				impact_x: nade.impactPointX,
				impact_y: nade.impactPointY,
				strat_id: data[0].id,
			};
		});

		const { error: nadeError } = await locals.supabase
			.from('nades')
			.insert(nadesForInsert);

		if (nadeError) {
			console.log(nadeError);
			return fail(400, {
				message: 'Something went wrong. Please try again later!',
			});
		}

		throw redirect(301, `/maps/${mapName}/strats/${data[0].id}`);
	},
};
