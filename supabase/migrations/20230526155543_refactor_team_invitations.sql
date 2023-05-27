drop policy "Enable team leaders to invite members" on "public"."team_members";

alter table "public"."team_members" drop constraint "fk_player";

alter table "public"."team_members" drop constraint "fk_team";

create table "public"."team_invitations" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "team_id" bigint,
    "player_id" bigint
);


alter table "public"."team_invitations" enable row level security;

alter table "public"."team_members" drop column "accepted";

CREATE UNIQUE INDEX team_invitaions_pkey ON public.team_invitations USING btree (id);

alter table "public"."team_invitations" add constraint "team_invitaions_pkey" PRIMARY KEY using index "team_invitaions_pkey";

alter table "public"."team_invitations" add constraint "team_invitations_player_id_fkey" FOREIGN KEY (player_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."team_invitations" validate constraint "team_invitations_player_id_fkey";

alter table "public"."team_invitations" add constraint "team_invitations_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE not valid;

alter table "public"."team_invitations" validate constraint "team_invitations_team_id_fkey";

alter table "public"."team_members" add constraint "team_members_player_id_fkey" FOREIGN KEY (player_id) REFERENCES profiles(id) not valid;

alter table "public"."team_members" validate constraint "team_members_player_id_fkey";

alter table "public"."team_members" add constraint "team_members_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) not valid;

alter table "public"."team_members" validate constraint "team_members_team_id_fkey";

create policy "Disable update"
on "public"."team_invitations"
as permissive
for update
to public
using (false);


create policy "Enable players and teams to remove entries"
on "public"."team_invitations"
as permissive
for delete
to public
using (((team_id IN ( SELECT teams.id
   FROM teams
  WHERE (teams.team_leader = ( SELECT profiles.id
           FROM profiles
          WHERE (profiles.uuid = auth.uid()))))) OR (player_id = ( SELECT profiles.id
   FROM profiles
  WHERE (profiles.uuid = auth.uid())))));


create policy "Enable read access for all users"
on "public"."team_invitations"
as permissive
for select
to public
using (true);


create policy "Enable team leaders to invite"
on "public"."team_invitations"
as permissive
for insert
to public
with check ((team_id IN ( SELECT teams.id
   FROM teams
  WHERE (teams.team_leader = ( SELECT profiles.id
           FROM profiles
          WHERE (profiles.uuid = auth.uid()))))));


create policy "Enable players to accept invitations"
on "public"."team_members"
as permissive
for insert
to public
with check (((team_id IN ( SELECT team_invitations.team_id
   FROM team_invitations
  WHERE (team_invitations.player_id = ( SELECT profiles.id
           FROM profiles
          WHERE (profiles.uuid = auth.uid()))))) AND (player_id = ( SELECT profiles.id
   FROM profiles
  WHERE (profiles.uuid = auth.uid())))));



