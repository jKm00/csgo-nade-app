drop policy "Enable delete for users based on user_id" on "public"."positions";

drop policy "Enable insert for authenticated users only" on "public"."positions";

drop policy "Enable update for users based on email" on "public"."positions";

create policy "Disable deletion of positions"
on "public"."positions"
as permissive
for delete
to public
using (false);


create policy "Disable insert of positions"
on "public"."positions"
as permissive
for insert
to public
with check (false);


create policy "Disable update of positions"
on "public"."positions"
as permissive
for update
to public
using (false)
with check (false);



