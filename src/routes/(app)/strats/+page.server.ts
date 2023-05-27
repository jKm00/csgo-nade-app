import { stratSchema } from '$lib/validations/zodShemas';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ url, locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(302, '/login?redirectTo=/strats');
	}

	const form = superValidate(stratSchema);
	const { data: maps } = await locals.supabase
		.from('maps')
		.select('name, radar');
	const { data: teams } = await locals.supabase
		.from('profile_teams')
		.select('team_id, team_name')
		.eq('profile_uuid', session.user.id);

	return {
		form,
		maps,
		teams,
	};
};
