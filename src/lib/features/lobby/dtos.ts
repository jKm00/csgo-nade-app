import type { SupabaseResponse } from '$lib/dtos';

interface LobbyMembers {
  profiles: {
    username: string;
  };
}

export interface LobbyMembersResponse
  extends SupabaseResponse<LobbyMembers[]> {}

export interface LobbyIdResponse extends SupabaseResponse<{ id: number }> {}

interface LobbyDetailsData {
  id: number;
  created_at: string;
  uid: string;
  team_id: number;
  team: {
    name: string;
    organization: string;
  };
  lobby_leader: {
    username: string;
  };
}

export interface LobbyDetailsResponse
  extends SupabaseResponse<LobbyDetailsData[]> {}
