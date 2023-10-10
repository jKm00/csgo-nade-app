-- change default value of game column to "cs2"
alter table "public"."strats" alter column "game_id" set default '2'::bigint;
