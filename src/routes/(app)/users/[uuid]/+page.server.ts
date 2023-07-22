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

	const fetchStrats = async () => {
		const { profile } = await parent();

		let strats;
		if (profile) {
			const { data } = await locals.supabase
				.from('strats')
				.select(
					`
					*, 
					profiles (username),
					maps (name),
					positions (img, name)
				`
				)
				.eq('author_id', profile.id)
				.limit(10);

			strats = data;
		}

		return (
			strats?.map((strat) => ({
				id: strat.id,
				name: strat.name,
				authorUsername:
					strat.profiles instanceof Array
						? strat.profiles[0].username
						: strat.profiles?.username ?? '',
				thumbnail: `/maps/${
					strat.maps instanceof Array
						? strat.maps[0].name.toLowerCase()
						: strat.maps?.name.toLowerCase() ?? ''
				}/${
					strat.positions instanceof Array
						? strat.positions[0].img
						: strat.positions?.img ?? ''
				}`,
				createdAt: new Date(strat.inserted_at),
				side: strat.team_side,
				position:
					strat.positions instanceof Array
						? strat.positions[0].name
						: strat.positions?.name ?? '',
				map:
					strat.maps instanceof Array
						? strat.maps[0].name
						: strat.maps?.name ?? '',
			})) ?? []
		);
	};

	return {
		teams: fetchTeams(),
		strats: fetchStrats(),
	};
};
