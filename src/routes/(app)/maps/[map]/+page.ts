export const load = async ({ params, parent }) => {
	const mapName = params.map;

	const MAP_IMAGES = {
		ancient: 'ancient_compressed.webp',
		anubis: 'anubis_compressed.webp',
		inferno: 'inferno_compressed.webp',
		mirage: 'mirage_compressed.webp',
		nuke: 'nuke_compressed.webp',
		overpass: 'overpass_compressed.webp',
		vertigo: 'vertigo_compressed.webp',
	};

	const thumbnail = MAP_IMAGES[mapName.toLowerCase()];

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
				teamName: strat.teams.name ?? null,
			};
		});
	};

	return {
		mapName: mapName,
		thumbnail,
		streamed: {
			strats: fetchStrats(),
		},
	};
};
