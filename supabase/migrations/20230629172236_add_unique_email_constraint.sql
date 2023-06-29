-- Create backup of profiles table
CREATE TABLE profiles_backup AS
SELECT * FROM profiles;

-- Add rls to backup
alter table "public"."profiles_backup" enable row level security;

-- Remove duplicated emails
DELETE FROM profiles
WHERE id NOT IN (
  SELECT MIN(id)
  FROM profiles
  GROUP BY email
);

-- Add unique constraint to email column
ALTER TABLE profiles
ADD CONSTRAINT unique_email_constraint UNIQUE (email);

-- Function for checking if username or email is taken
CREATE OR REPLACE FUNCTION get_profiles_by_username_or_email(input_username text, input_email text)
  RETURNS SETOF profiles
  LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
    SELECT *
    FROM profiles
    WHERE profiles.username = input_username
    OR profiles.email = input_email;
END;
$$;