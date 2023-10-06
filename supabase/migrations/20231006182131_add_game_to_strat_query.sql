DROP FUNCTION IF EXISTS public.query_strats_with_filters(
  p_map text, 
  p_strat_position text, 
  p_side text, 
  p_strat_name text, 
  p_team_name text,
  p_author text
);

CREATE OR REPLACE FUNCTION public.query_strats_with_filters(
  p_map text default null, 
  p_strat_position text default null, 
  p_side text default null, 
  p_strat_name text default null, 
  p_team_name text default null, 
  p_author text default null
)
 RETURNS TABLE(
  strat_id bigint, 
  strat_name text, 
  author character varying, 
  author_id uuid, 
  created_at timestamp with time zone, 
  team text, side text, 
  position_name text, 
  position_img text, 
  map_name text,
  game_short_name text,
  game_full_name text
)
LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
      s.id as strat_id,
      s.name AS strat_name, 
      p.username AS author,
      p.uuid as author_id,
      s.inserted_at AS created_at,
      t.name AS team,
      s.team_side AS side,
      pos.name AS position_name,
      pos.img as position_img,
      m.name as map_name,
      g.short_name as game_short_name,
      g.full_name as game_full_name
    FROM strats s
    INNER JOIN profiles p ON p.id = s.author_id
    LEFT JOIN teams t ON t.id = s.team_id
    INNER JOIN positions pos ON pos.id = s.position_id
    INNER JOIN maps m ON m.id = s.map_id
    INNER JOIN games g ON g.id = s.game_id
    WHERE 
        (p_map IS NULL OR m.name = p_map) AND
        (p_strat_position IS NULL OR pos.name = p_strat_position) AND
        (p_side IS NULL OR s.team_side = p_side) AND
        (p_strat_name IS NULL OR s.name ILIKE '%' || p_strat_name || '%') AND
        (p_team_name IS NULL OR t.name ILIKE '%' || p_team_name || '%') AND
        (p_author IS NULL OR p.username ILIKE '%' || p_author || '%');
END;
$function$
;