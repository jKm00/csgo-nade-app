export const load = async ({ params, parent }) => {
	const mapName = params.map;

	const fetchMap = async () => {
		const { supabase } = await parent();

		const { data } = await supabase
			.from('maps')
			.select('name, thumbnail')
			.ilike('name', mapName);

		const { data: strats } = await supabase
			.from('strats')
			.select(
				`
				*,
				maps ( name )
			`
			)
			.eq('name', mapName);

		return {
			details: data,
			strats,
		};
	};

	return {
		streamed: {
			map: fetchMap(),
		},
	};
};
