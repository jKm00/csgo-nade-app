import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
  const session = await locals.getSession();

  if (!session) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { supabase } = locals;

  // Fetch user id
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('uuid', session.user.id)
    .single();

  if (profileError) {
    return json({ error: profileError.message }, { status: 500 });
  }

  const { teamId } = await request.json();

  // Create new lobby
  const { data: lobbyData, error: lobbyError } = await supabase
    .from('lobbies')
    .insert({
      team_id: teamId,
      lobby_leader: profile.id,
    })
    .select()
    .single();

  if (lobbyError) {
    return json({ error: lobbyError.message }, { status: 500 });
  }

  // Add user to lobby
  const { error } = await supabase.from('lobby_members').insert({
    player_id: profile.id,
    lobby_id: lobbyData.id,
  });

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }

  return json({ url: `/lobbies/${lobbyData.uid}` });
}
