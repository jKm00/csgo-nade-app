CREATE OR REPLACE FUNCTION public.query_strats_with_filters(p_map text, p_strat_position text, p_side text, p_strat_name text, p_team_name text, p_author text)
 RETURNS TABLE(strat_name text, author character varying, author_id uuid, created_at timestamp with time zone, team text, side text, position_name text, position_img text, map_name text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
      s.name AS strat_name, 
      p.username AS author,
      p.uuid as author_id,
      s.inserted_at AS created_at,
      t.name AS team,
      s.team_side AS side,
      pos.name AS position_name,
      pos.img as position_img,
      m.name as map_name
    FROM strats s
    INNER JOIN profiles p ON p.id = s.author_id
    LEFT JOIN teams t ON t.id = s.team_id
    INNER JOIN positions pos ON pos.id = s.position_id
    INNER JOIN maps m ON m.id = s.map_id
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