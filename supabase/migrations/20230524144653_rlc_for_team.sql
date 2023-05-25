create policy "Enable team leader to delete"
on "public"."teams"
as permissive
for delete
to public
using ((team_leader = ( SELECT profiles.id
   FROM profiles
  WHERE (profiles.uuid = auth.uid()))));


create policy "Enable team leader to upade"
on "public"."teams"
as permissive
for update
to public
using ((team_leader = ( SELECT profiles.id
   FROM profiles
  WHERE (profiles.uuid = auth.uid()))))
with check ((team_leader = ( SELECT profiles.id
   FROM profiles
  WHERE (profiles.uuid = auth.uid()))));



