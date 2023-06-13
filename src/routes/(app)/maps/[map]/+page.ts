export const load = async ({ params, parent }) => {
	const mapName = params.map;

	const fetchStrats = async () => {
		const { supabase } = await parent();

		const { data } = await supabase
			.from('maps')
			.select(
				`strats (
				id,
				name, 
				description,
				inserted_at,
				team_side,
				positions (
					name,
					img
				),
				profiles (
					uuid,
					username
				),
				teams (
					name
				)
			)`
			)
			.eq('name', mapName)
			.single();

		return data.strats.map((strat) => {
			return {
				id: strat.id,
				name: strat.name,
				desc: strat.description,
				createdAt: strat.inserted_at,
				teamSide: strat.team_side,
				positionName: strat.positions?.name ?? undefined,
				positionImage: strat.positions?.img ?? undefined,
				authorUuid: strat.profiles.uuid,
				authorName: strat.profiles.username,
				teamName: strat.teams === null ? null : strat.teams.name,
			};
		});
	};

	return {
		mapName: mapName,
		streamed: {
			strats: fetchStrats(),
		},
	};
};
