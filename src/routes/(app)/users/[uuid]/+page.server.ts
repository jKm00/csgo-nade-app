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
					positions (img, name),
					teams (name)
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
				thumbnail:
					strat.positions instanceof Array
						? `/maps/${
								strat.maps instanceof Array
									? strat.maps[0].name.toLowerCase()
									: strat.maps?.name.toLowerCase() ?? ''
						  }/${strat.positions[0].img}`
						: strat.positions
						? `/maps/${
								strat.maps instanceof Array
									? strat.maps[0].name.toLowerCase()
									: strat.maps?.name.toLowerCase()
						  }/${strat.positions.img}`
						: undefined,
				createdAt: new Date(strat.inserted_at),
				side: strat.team_side,
				position:
					strat.positions instanceof Array
						? strat.positions[0].name
						: strat.positions
						? strat.positions.name
						: undefined,
				map:
					strat.maps instanceof Array
						? strat.maps[0].name
						: strat.maps?.name ?? '',
				team:
					strat.teams instanceof Array
						? strat.teams[0].name
						: strat.teams?.name ?? undefined,
			})) ?? []
		);
	};

	return {
		teams: fetchTeams(),
		strats: fetchStrats(),
	};
};
