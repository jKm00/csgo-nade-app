alter table "public"."profiles" add column "profile_picture" text not null default 'profile_1.png'::text;


create policy "list_all_buckets"
on "storage"."buckets"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "storage"."objects"
as permissive
for select
to public
using (true);



