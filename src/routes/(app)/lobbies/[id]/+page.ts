import { redirect } from '@sveltejs/kit';
import type {
  LobbyIdResponse,
  LobbyMembersResponse,
} from '$lib/features/lobby/dtos.js';

export const load = async ({ params, parent }) => {
  const { supabase, session } = await parent();

  if (!session) {
    throw redirect(302, '/');
  }

  // Check if user is in the lobby
  const { data, error } = await supabase
    .from('lobbies')
    .select(
      `
    uid,
    profiles ( uuid )
  `
    )
    .eq('uid', params.id)
    .eq('profiles.uuid', session?.user.id);

  if (!data || data.length === 0) {
    throw redirect(302, '/');
  }

  async function fetchLobbyMembers() {
    const { data: lobbyData, error } = (await supabase
      .from('lobbies')
      .select(
        `
        id
        `
      )
      .eq('uid', params.id)
      .single()) as LobbyIdResponse;

    if (!lobbyData) {
      return [];
    }

    const { data: lobbyMembers } = (await supabase
      .from('lobby_members')
      .select(
        `
        profiles (
          username
        )
    `
      )
      .eq('lobby_id', lobbyData.id)) as LobbyMembersResponse;

    if (!lobbyMembers) {
      return [];
    }

    return lobbyMembers.map((member) => member.profiles.username);
  }

  return {
    members: fetchLobbyMembers(),
  };
};
