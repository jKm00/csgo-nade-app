drop policy "Enable insert for authenticated users only" on "public"."profiles";

create policy "Enable insert access for all users"
on "public"."profiles"
as permissive
for insert
to public
with check (true);



