export const load = async ({ locals, parent }) => {
	const fetchTeams = async () => {
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

		return (
			teams?.map((team) => ({
				name: team.team_name ?? '',
				org: team.org ?? '',
				role: team.player_role ?? 'N/A',
				joinedAt: new Date(team.joined_at ?? ''),
			})) ?? []
		);
	};

	return {
		teams: fetchTeams(),
	};
};
