create schema if not exists "_supavisor";


alter table "public"."team_members" drop constraint "team_members_player_id_fkey";

alter table "public"."team_members" add constraint "public_team_members_player_id_fkey" FOREIGN KEY (player_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."team_members" validate constraint "public_team_members_player_id_fkey";


