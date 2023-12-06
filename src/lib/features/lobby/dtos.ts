import type { SupabaseResponse } from '$lib/dtos';

interface LobbyMembers {
  profiles: {
    username: string;
  };
}

export interface LobbyMembersResponse
  extends SupabaseResponse<LobbyMembers[]> {}

export interface LobbyIdResponse extends SupabaseResponse<{ id: number }> {}
