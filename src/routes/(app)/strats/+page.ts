export const load = async ({ url, locals, parent }) => {
	const map = url.searchParams.get('map');
	const position = url.searchParams.get('position');
	const side = url.searchParams.get('side');
	const strat = url.searchParams.get('stratName');
	const team = url.searchParams.get('teamName');
	const author = url.searchParams.get('author');

	const fetchStrats = async () => {
		const { supabase } = await parent();
		const { data, error } = await supabase.rpc('query_strats_with_filters', {
			p_map: map,
			p_strat_position: position,
			p_side: side,
			p_strat_name: strat,
			p_team_name: team,
			p_author: author,
		});

		const strats = data?.map(
			(strat: {
				strat_id: number;
				strat_name: string;
				author: string;
				author_id: string;
				created_at: string;
				team: string;
				side: string;
				position_name: string;
				map_name: string;
				position_img: string;
			}) => ({
				stratId: strat.strat_id,
				stratName: strat.strat_name,
				author: strat.author,
				authorId: strat.author_id,
				createdAt: strat.created_at,
				team: strat.team,
				side: strat.side,
				position: strat.position_name,
				thumbnail: `/maps/${strat.map_name.toLowerCase()}/${
					strat.position_img
				}`,
			})
		);

		return strats;
	};

	return {
		map,
		position,
		side,
		strat,
		team,
		author,
		lazy: {
			strats: fetchStrats(),
		},
	};
};
