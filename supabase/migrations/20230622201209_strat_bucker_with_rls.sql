insert into 
storage.buckets (id, name)
values ('strats', 'Strats');

create policy "Allow author to access private strats"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'strats'::text) AND ((storage.foldername(name))[1] IN ( SELECT (s.id)::text AS id
   FROM (strats s
     JOIN profiles p ON ((p.id = s.author_id)))
  WHERE ((s.privacy = 'PRIVATE'::text) AND (p.uuid = auth.uid()))))));


create policy "Allow author to manage strat images 1ka1jgv_1"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'strats'::text) AND ((storage.foldername(name))[1] IN ( SELECT (s.id)::text AS id
   FROM (strats s
     JOIN profiles p ON ((p.id = s.author_id)))
  WHERE (p.uuid = auth.uid())))));


create policy "Allow author to manage strat images 1ka1jgv_2"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'strats'::text) AND ((storage.foldername(name))[1] IN ( SELECT (s.id)::text AS id
   FROM (strats s
     JOIN profiles p ON ((p.id = s.author_id)))
  WHERE (p.uuid = auth.uid())))));


create policy "Allow author to manage strat images"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'strats'::text) AND ((storage.foldername(name))[1] IN ( SELECT (s.id)::text AS id
   FROM (strats s
     JOIN profiles p ON ((p.id = s.author_id)))
  WHERE (p.uuid = auth.uid())))));


create policy "Allow read access to public strat"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'strats'::text) AND ((storage.foldername(name))[1] IN ( SELECT (s.id)::text AS id
   FROM strats s
  WHERE (s.privacy = 'PUBLIC'::text)))));


create policy "Allow team members to access private strats"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'strats'::text) AND ((storage.foldername(name))[1] IN ( SELECT (s.id)::text AS id
   FROM (((strats s
     JOIN teams t ON ((t.id = s.team_id)))
     JOIN team_members tm ON ((tm.team_id = t.id)))
     JOIN profiles p ON ((p.id = tm.player_id)))
  WHERE ((s.privacy = 'PRIVATE'::text) AND (p.uuid = auth.uid()))))));



