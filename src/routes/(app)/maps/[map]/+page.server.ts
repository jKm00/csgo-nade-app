export const load = async ({ locals, params }) => {
	const mapName = params.map;

	const { data } = await locals.supabase
		.from('maps')
		.select('name, thumbnail')
		.ilike('name', mapName);

	return {
		map: data,
	};
};
