alter table "public"."strats" drop constraint "fk_map";

alter table "public"."strats" drop constraint "fk_team";

alter table "public"."strats" drop constraint "strats_author_id_fkey";

alter table "public"."strats" add constraint "strats_map_id_fkey" FOREIGN KEY (map_id) REFERENCES maps(id) not valid;

alter table "public"."strats" validate constraint "strats_map_id_fkey";

alter table "public"."strats" add constraint "strats_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) not valid;

alter table "public"."strats" validate constraint "strats_team_id_fkey";

alter table "public"."strats" add constraint "strats_author_id_fkey" FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."strats" validate constraint "strats_author_id_fkey";


