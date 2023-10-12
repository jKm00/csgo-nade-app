import type { NadeType } from '$lib/features/stratEditor/types/nade';

export const load = async ({ params, parent }) => {
  const fetchStrat = async () => {
    const stratId = params.id;

    const { supabase } = await parent();
    const { data, error } = await supabase
      .from('strats')
      .select(
        `
				id,
				name,
				description,
				inserted_at,
				team_side,
				positions (
					name
				),
				profiles (
					uuid,
					username
				),
				teams (
					name
				),
				maps ( 
					name, 
					radar, 
					thumbnail 
				),
				nades (*),
				games (
					short_name
				)
			`
      )
      .eq('id', stratId)
      .single();

    if (data === null) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      desc: data.description,
      createdAt: data.inserted_at,
      teamSide: data.team_side,
      position:
        data.positions instanceof Array
          ? data.positions[0].name
          : data.positions?.name ?? undefined,
      author: {
        uuid:
          data.profiles instanceof Array
            ? data.profiles[0].uuid
            : data.profiles?.uuid,
        username:
          data.profiles instanceof Array
            ? data.profiles[0].username
            : data.profiles?.username,
      },
      teamName:
        data.teams instanceof Array
          ? data.teams[0].name
          : data.teams?.name ?? null,
      map: {
        name: data.maps instanceof Array ? data.maps[0].name : data.maps?.name,
        thumbnail:
          data.maps instanceof Array
            ? data.maps[0].thumbnail
            : data.maps?.thumbnail,
        radar:
          data.maps instanceof Array ? data.maps[0].radar : data.maps?.radar,
      },
      nades: data.nades?.map(
        (nade: {
          id: number;
          name: string;
          notes: string;
          type: string;
          lineup_x: number;
          lineup_y: number;
          impact_x: number;
          impact_y: number;
          lineup_img: string;
          impact_img: string;
        }) => ({
          id: nade.id,
          name: nade.name,
          notes: nade.notes,
          type: nade.type as NadeType,
          lineupX: nade.lineup_x,
          lineupY: nade.lineup_y,
          impactX: nade.impact_x,
          impactY: nade.impact_y,
          lineupImg: nade.lineup_img,
          impactImg: nade.impact_img,
        })
      ),
      game:
        data.games instanceof Array
          ? data.games[0].short_name
          : data.games?.short_name,
    };
  };

  return {
    lazy: {
      strat: fetchStrat(),
    },
  };
};
