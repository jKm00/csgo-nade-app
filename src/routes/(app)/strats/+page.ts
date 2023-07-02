export const load = async ({ url, parent }) => {
	const map = url.searchParams.get('map');
	const position = url.searchParams.get('position');
	const side = url.searchParams.get('side');
	const strat = url.searchParams.get('stratName');
	const team = url.searchParams.get('teamName');
	const author = url.searchParams.get('author');

	const { supabase } = await parent();
	const { data, error } = await supabase.rpc('query_strats_with_filters', {
		p_map: map,
		p_strat_position: position,
		p_side: side,
		p_strat_name: strat,
		p_team_name: team,
		p_author: author,
	});

	// TODO: Return data and display in .svelte
	console.log(data, error);

	return {
		map,
		position,
		side,
		strat,
		team,
		author,
	};
};
