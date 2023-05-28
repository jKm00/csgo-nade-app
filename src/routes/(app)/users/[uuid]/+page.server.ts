export const load = async ({ locals, parent }) => {
	const { profile } = await parent();

	let teams;
	if (profile) {
		// Fetch all teams for player
		const { data } = await locals.supabase
			.from('profile_teams')
			.select('*')
			.eq('player_id', profile.id);

		teams = data;
	}

	return {
		teams,
	};
};
