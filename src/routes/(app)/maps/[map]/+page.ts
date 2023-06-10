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
				profiles (
					uuid,
					username
				),
				teams (
					name
				)
			)`
			)
			.eq('name', mapName);

		return data[0].strats.map((strat) => {
			return {
				id: strat.id,
				name: strat.name,
				desc: strat.description,
				createdAt: strat.inserted_at,
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
