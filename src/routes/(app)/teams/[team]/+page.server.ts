export const load = async ({ params, locals }) => {
	const teamName = params.team;

	const team = await locals.supabase
		.from('teams')
		.select()
		.eq('name', teamName);

	return {
		team: team.data && team.data.length > 0 ? team.data[0] : null,
	};
};
