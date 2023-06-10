set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_strat_team_member(_user_id uuid, _strat_id bigint)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
AS $function$select exists (
  select 1
  from strats s
  left join teams t on t.id = s.team_id
  full outer join team_members tm on tm.team_id = t.id
  full outer join profiles p on p.id = tm.player_id
  where s.id = _strat_id and p.uuid = _user_id
)$function$
;


