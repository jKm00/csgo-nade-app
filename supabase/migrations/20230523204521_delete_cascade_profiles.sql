alter table "public"."profiles" drop constraint "profiles_uuid_fkey";

alter table "public"."profiles" add constraint "profiles_uuid_fkey" FOREIGN KEY (uuid) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_uuid_fkey";


