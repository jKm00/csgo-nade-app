alter table "public"."teams" drop constraint "teams_name_key";

drop index if exists "public"."teams_name_key";

alter table "public"."team_members" add column "accepted" boolean not null default false;

CREATE UNIQUE INDEX unique_name ON public.teams USING btree (name);

alter table "public"."teams" add constraint "unique_name" UNIQUE using index "unique_name";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_user_role()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.user_roles (user_id, role_id)
  values (new.id, 1);
  return new;
end;
$function$
;

create policy "Enable admins to add roles"
on "public"."roles"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT p.uuid
   FROM ((profiles p
     JOIN user_roles ur ON ((ur.user_id = p.id)))
     JOIN roles r ON ((r.id = ur.role_id)))
  WHERE ((r.name)::text = 'ADMIN'::text))));


create policy "Enable admins to delete roles"
on "public"."roles"
as permissive
for update
to public
using ((auth.uid() IN ( SELECT p.uuid
   FROM ((profiles p
     JOIN user_roles ur ON ((ur.user_id = p.id)))
     JOIN roles r ON ((r.id = ur.role_id)))
  WHERE ((r.name)::text = 'ADMIN'::text))));


create policy "Enable admins to update roles"
on "public"."roles"
as permissive
for update
to public
using ((auth.uid() IN ( SELECT p.uuid
   FROM ((profiles p
     JOIN user_roles ur ON ((ur.user_id = p.id)))
     JOIN roles r ON ((r.id = ur.role_id)))
  WHERE ((r.name)::text = 'ADMIN'::text))));


create policy "Enable players and team leaders to leave team"
on "public"."team_members"
as permissive
for delete
to public
using (((player_id = ( SELECT p.id
   FROM profiles p
  WHERE (p.uuid = auth.uid()))) OR (team_id IN ( SELECT t.id
   FROM teams t
  WHERE (t.team_leader = ( SELECT p.id
           FROM profiles p
          WHERE (p.uuid = auth.uid())))))));


create policy "Enable players to update status"
on "public"."team_members"
as permissive
for update
to public
using ((player_id = ( SELECT p.id
   FROM profiles p
  WHERE (p.uuid = auth.uid()))));


create policy "Enable read access for all users"
on "public"."team_members"
as permissive
for select
to public
using (true);


create policy "Enable team leaders to invite members"
on "public"."team_members"
as permissive
for insert
to public
with check ((team_id IN ( SELECT t.id
   FROM teams t
  WHERE (t.team_leader = ( SELECT p.id
           FROM profiles p
          WHERE (p.uuid = auth.uid()))))));


create policy "Enable admins to add user roles"
on "public"."user_roles"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT p.uuid
   FROM ((profiles p
     JOIN user_roles ur ON ((ur.user_id = p.id)))
     JOIN roles r ON ((r.id = ur.role_id)))
  WHERE ((r.name)::text = 'ADMIN'::text))));


create policy "Enable admins to delete user roles"
on "public"."user_roles"
as permissive
for delete
to public
using ((auth.uid() IN ( SELECT p.uuid
   FROM ((profiles p
     JOIN user_roles ur ON ((ur.user_id = p.id)))
     JOIN roles r ON ((r.id = ur.role_id)))
  WHERE ((r.name)::text = 'ADMIN'::text))));


create policy "Enable admins to update user roles"
on "public"."user_roles"
as permissive
for update
to public
using ((auth.uid() IN ( SELECT p.uuid
   FROM ((profiles p
     JOIN user_roles ur ON ((ur.user_id = p.id)))
     JOIN roles r ON ((r.id = ur.role_id)))
  WHERE ((r.name)::text = 'ADMIN'::text))));


CREATE TRIGGER on_profile_created AFTER INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION create_user_role();


