import { redirect } from '@sveltejs/kit';

export const load = async ({ url, locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(302, '/login?redirectTo=/strats');
	}

	const { data: maps } = await locals.supabase
		.from('maps')
		.select('id, name, positions ( id, name )');
	const { data: teams } = await locals.supabase
		.from('profile_teams')
		.select('team_id, team_name')
		.eq('profile_uuid', session.user.id);

	return {
		maps: maps?.map((map) => {
			return {
				...map,
				positions:
					map.positions instanceof Array
						? map.positions?.map((position) => {
								return {
									id: position.id,
									name: position.name,
								};
						  })
						: [
								{
									id: map.positions?.id,
									name: map.positions?.id,
								},
						  ],
			};
		}),
		teams,
	};
};
