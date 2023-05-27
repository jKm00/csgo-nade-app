import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	const session = await locals.getSession();

	if (!session || params.uuid !== session.user.id) {
		throw redirect(302, '/');
	}

	const uuid = params.uuid;

	const { data: userData } = await locals.supabase
		.from('profiles')
		.select('id')
		.eq('uuid', session.user.id);

	if (!userData || userData.length === 0) {
		throw redirect(302, '/');
	}

	const { data } = await locals.supabase
		.from('team_invitations')
		.select(
			`
      id,
			player_id,
			team_role,
      teams ( name, organization )
    `
		)
		.eq('player_id', userData[0].id);

	return {
		invitations: data,
	};
};
