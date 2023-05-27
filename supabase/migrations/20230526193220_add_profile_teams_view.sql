drop policy "Enable players to accept invitations" on "public"."team_members";

alter table "public"."teams" drop constraint "fk_leader";

alter table "public"."teams" add column "organization" text;

alter table "public"."teams" add constraint "teams_team_leader_fkey" FOREIGN KEY (team_leader) REFERENCES profiles(id) not valid;

alter table "public"."teams" validate constraint "teams_team_leader_fkey";

create or replace view "public"."members_in_teams" as  SELECT count(*) AS count,
    team_members.team_id
   FROM team_members
  GROUP BY team_members.team_id;


create or replace view "public"."profile_teams" as  SELECT p.id AS player_id,
    t.name AS team_name,
    t.organization AS org,
    tm.role AS player_role,
    tm.inserted_at AS joined_at,
    count(*) OVER (PARTITION BY t.id) AS total_players
   FROM ((team_members tm
     JOIN teams t ON ((tm.team_id = t.id)))
     JOIN profiles p ON ((tm.player_id = p.id)));


create policy "Enable players to accept inivtations"
on "public"."team_members"
as permissive
for insert
to public
with check (((team_id IN ( SELECT teams.id
   FROM teams
  WHERE (teams.team_leader = ( SELECT profiles.id
           FROM profiles
          WHERE (profiles.uuid = auth.uid()))))) OR ((team_id IN ( SELECT team_invitations.team_id
   FROM team_invitations
  WHERE (team_invitations.player_id = ( SELECT profiles.id
           FROM profiles
          WHERE (profiles.uuid = auth.uid()))))) AND (player_id = ( SELECT profiles.id
   FROM profiles
  WHERE (profiles.uuid = auth.uid()))))));



