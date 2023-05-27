begin;

-- remove the supabase_realtime publication
drop
  publication if exists supabase_realtime;

-- re-create the supabase_realtime publication with no tables
create publication supabase_realtime;

commit;

-- add a table to the publication
alter
  publication supabase_realtime add table team_invitations;