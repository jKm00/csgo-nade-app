set check_function_bodies = off;

--update a row at public.profiles
create or replace function public.handle_update_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  update public.profiles set email = new.email; 
  return new;
end;
$$;

-- trigger the function every time a user email is updated
create trigger on_auth_user_updated
  after update of email on auth.users
  for each row execute procedure public.handle_update_user();