drop policy "Enable select for public and private strats" on "public"."strats";

drop policy "Enable strat authors to delete strat" on "public"."strats";

drop policy "Enable strat authors to update strat" on "public"."strats";

alter table "public"."strats" drop constraint "fk_player";

drop function if exists "public"."has_access_to_private_strat"(_user_id uuid, _strat_id bigint);

alter table "public"."strats" drop column "player_id";

alter table "public"."strats" add column "author_id" bigint not null;

alter table "public"."strats" add constraint "strats_author_id_fkey" FOREIGN KEY (author_id) REFERENCES profiles(id) not valid;

alter table "public"."strats" validate constraint "strats_author_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_strat_team_member(_user_id uuid, _strat_id bigint)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
AS $function$select exists (
  select 1
  from strats s
  left join profiles p on p.id = s.author_id
  left join teams t on t.id = s.team_id
  full outer join team_members tm on tm.team_id = t.id
  where s.id = _strat_id and p.uuid = _user_id
)$function$
;

create policy "Enable select for public and private strats"
on "public"."strats"
as permissive
for select
to public
using (((privacy = 'PUBLIC'::text) OR ((privacy = 'PRIVATE'::text) AND (author_id = ( SELECT p.id
   FROM profiles p
  WHERE (p.uuid = auth.uid())))) OR ((privacy = 'PRIVATE'::text) AND is_strat_team_member(auth.uid(), id))));


create policy "Enable strat authors to delete strat"
on "public"."strats"
as permissive
for delete
to public
using ((author_id IN ( SELECT p.id
   FROM profiles p
  WHERE (p.uuid = auth.uid()))));


create policy "Enable strat authors to update strat"
on "public"."strats"
as permissive
for update
to public
using ((author_id IN ( SELECT p.id
   FROM profiles p
  WHERE (p.uuid = auth.uid()))))
with check ((author_id IN ( SELECT p.id
   FROM profiles p
  WHERE (p.uuid = auth.uid()))));



