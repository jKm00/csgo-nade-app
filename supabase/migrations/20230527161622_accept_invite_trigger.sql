alter table "public"."team_invitations" add column "team_role" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_invite_accept()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  delete from public.team_invitations
  where team_id = new.team_id and player_id = new.player_id;
  return new;
end;
$function$
;

CREATE TRIGGER invitation_accepted AFTER INSERT ON public.team_members FOR EACH ROW EXECUTE FUNCTION handle_invite_accept();


