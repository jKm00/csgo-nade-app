set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.on_auth_user_delete()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  delete from public.profiles
  where uuid = old.id;
  return old;
end;
$function$
;

CREATE TRIGGER on_auth_user_delete_trigger BEFORE DELETE ON auth.users FOR EACH ROW EXECUTE FUNCTION on_auth_user_delete();

CREATE OR REPLACE FUNCTION public.remove_user_role()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  delete from public.user_roles
  where user_id = old.id;
  return old;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.change_user_password(current_plain_password character varying, new_plain_password character varying)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
_uid uuid; -- for checking by 'is not found'
user_id uuid; -- to store the user id from the request
BEGIN
  -- First of all check the new password rules
  -- not empty
  IF (new_plain_password = '') IS NOT FALSE THEN
    RAISE EXCEPTION 'new password is empty';
  END IF;
  
  -- Get user by his current auth.uid and current password
  user_id := auth.uid();
  SELECT id INTO _uid
  FROM auth.users
  WHERE id = user_id
  AND encrypted_password =
  crypt(current_plain_password::text, auth.users.encrypted_password);

  -- Check the currect password
  IF NOT FOUND THEN
    RAISE EXCEPTION 'incorrect password';
  END IF;

  -- Then set the new password
  UPDATE auth.users SET 
  encrypted_password =
  crypt(new_plain_password, gen_salt('bf'))
  WHERE id = user_id;
  
  RETURN '{"data":true}';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_user_role()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.user_roles (user_id, role_id)
  values (new.id, 1);
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_invite_accept()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  delete from public.team_invitations
  where team_id = new.team_id and player_id = new.player_id;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_update_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  update public.profiles set email = new.email; 
  return new;
end;
$function$
;

CREATE TRIGGER on_user_delete BEFORE DELETE ON public.profiles FOR EACH ROW EXECUTE FUNCTION remove_user_role();


