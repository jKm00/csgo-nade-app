import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	const session = await locals.getSession();

	if (!session || params.uuid !== session.user.id) {
		throw redirect(302, '/');
	}

	const uuid = params.uuid;

	const { data } = await locals.supabase
		.from('team_invitations')
		.select(
			`
      id,
      profiles ( uuid ),
      teams ( name, organization )
    `
		)
		.eq('profiles.uuid', uuid);

	return {
		invitations: data,
	};
};
