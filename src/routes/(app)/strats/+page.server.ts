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
		.select('id, name, radar');
	const { data: teams } = await locals.supabase
		.from('profile_teams')
		.select('team_id, team_name')
		.eq('profile_uuid', session.user.id);

	return {
		maps,
		teams,
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();

		const name = form.get('name');
		const desc = form.get('description');
		const mapId = form.get('mapId');
		const position = form.get('position');
		const privacy = form.get('privacy');
		const teamId = form.get('teamId');
		const nades = form.get('nades');
		const playerId = form.get('playerId');

		if (
			name === '' ||
			desc === '' ||
			mapId === '' ||
			position === '' ||
			privacy === '' ||
			nades?.length === 0 ||
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
				strat_position: position,
				privacy: privacy,
				map_id: mapId,
				player_id: playerId,
				team_id: teamId === '' ? null : teamId,
			})
			.select('id');

		if (error) {
			console.log(error);
			return fail(400, {
				message: 'Something went wrong. Please try again later!',
			});
		}

		// TODO: Insert nades

		throw redirect(301, `/strats/${data[0].id}`);
	},
};
