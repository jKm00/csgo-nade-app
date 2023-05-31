drop policy "Enable team leader to upade" on "public"."teams";

create policy "Enable team leaders to update teams"
on "public"."teams"
as permissive
for update
to public
using ((team_leader = ( SELECT profiles.id
   FROM profiles
  WHERE (profiles.uuid = auth.uid()))))
with check (
   true
);



