import type { TeamsLobbyResponse } from '$lib/dtos/teamsLobbyResponse.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const session = await locals.getSession();

  if (!session) {
    throw redirect(302, '/login?redirectTo=/lobby');
  }

  const fetchMaps = async () => {
    const { data } = await locals.supabase
      .from('maps')
      .select('id, name, thumbnail');

    if (data === null) {
      return [];
    }

    return data;
  };

  const fetchTeams = async () => {
    const { data } = await locals.supabase
      .from('teams')
      .select(
        `
        id,
        name,
        profiles ( uuid )
      `
      )
      .eq('profiles.uuid', session?.user.id);

    const result = data?.filter((d) => d.profiles !== null);

    return result as TeamsLobbyResponse;
  };

  return {
    maps: fetchMaps(),
    teams: fetchTeams(),
  };
};
