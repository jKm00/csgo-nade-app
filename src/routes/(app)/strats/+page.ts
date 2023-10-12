export const load = async ({ url, parent }) => {
  const map = url.searchParams.get('map');
  const position = url.searchParams.get('position');
  const side = url.searchParams.get('side');
  const strat = url.searchParams.get('stratName');
  const team = url.searchParams.get('teamName');
  const author = url.searchParams.get('author');

  let filters = [];
  for (const [key, value] of url.searchParams.entries()) {
    filters.push({ key, value });
  }

  const fetchStrats = async () => {
    const { supabase } = await parent();
    const { data, error } = await supabase.rpc('query_strats_with_filters', {
      p_map: map === '' ? null : map,
      p_strat_position: position === '' ? null : position,
      p_side: side === '' ? null : side,
      p_strat_name: strat === '' ? null : strat,
      p_team_name: team === '' ? null : team,
      p_author: author === '' ? null : author,
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
        game_short_name: string;
        game_full_name: string;
      }) => ({
        stratId: strat.strat_id,
        stratName: strat.strat_name,
        author: strat.author,
        authorId: strat.author_id,
        createdAt: strat.created_at,
        team: strat.team,
        side: strat.side,
        position: strat.position_name,
        thumbnail: strat.position_img
          ? `/maps/${strat.map_name.toLowerCase()}/${strat.position_img}`
          : undefined,
        game: {
          shortName: strat.game_short_name,
          fullName: strat.game_full_name,
        },
      })
    );

    return strats;
  };

  const fetchMaps = async () => {
    const { supabase } = await parent();
    const { data, error } = await supabase.from('maps').select('id, name');

    return {
      data: data as { id: number; name: string }[],
    };
  };

  const fetchPosition = async () => {
    const { supabase } = await parent();
    const { data } = await supabase.from('positions').select('map_id, name');

    return {
      data: data as { map_id: number; name: string }[],
    };
  };

  return {
    filters,
    maps: fetchMaps(),
    positions: fetchPosition(),
    lazy: {
      strats: fetchStrats(),
    },
  };
};
