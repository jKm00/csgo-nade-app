import type {
  NotificationData,
  NotificationResponse,
  SingleNotificationResponse,
} from '$lib/dtos';
import type { CustomError, Success } from '$lib/types';
import type { SupabaseClient } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
  const session = await locals.getSession();

  if (!session || params.uuid !== session.user.id) {
    throw redirect(302, '/');
  }

  async function fetchNotifications(type: number) {
    const { data: userData } = await locals.supabase
      .from('profiles')
      .select('id')
      .eq('uuid', session.user.id)
      .single();

    const { data } = (await locals.supabase
      .from('notifications')
      .select('*, type ( name )')
      .eq('type', type)
      .eq('status', 'PENDING')
      .eq('recipient_id', userData?.id)) as NotificationResponse;

    return data;
  }

  async function fetchTeamInvitations() {
    const TEAM_INVITATION_NAME = 2;
    return await fetchNotifications(TEAM_INVITATION_NAME);
  }

  async function fetchLobbyInvitations() {
    const LOBBY_INVITATION_NAME = 1;
    return await fetchNotifications(LOBBY_INVITATION_NAME);
  }

  return {
    teamInvitations: fetchTeamInvitations(),
    lobbyInvitations: fetchLobbyInvitations(),
  };
};

export const actions = {
  decline: async ({ request, locals }) => {
    const invitationId = (await request.formData()).get('invitationId');

    if (!invitationId) {
      return fail(400, {
        error: 'Failed to find invitation',
      });
    }

    const { error } = await locals.supabase
      .from('notifications')
      .update({ status: 'DECLINED', updated_at: new Date() })
      .eq('id', invitationId);

    if (error) {
      console.log(error);
      return fail(400, {
        error: error.message,
      });
    }

    return { success: 'Invitation declined' };
  },
  accept: async ({ request, locals }) => {
    const invitationId = (await request.formData()).get('invitationId');

    if (!invitationId) {
      return fail(400, {
        error: 'Failed to find invitation. Please try again!',
      });
    }

    // Fetch additional data from invitations
    const { data: notificationData } = (await locals.supabase
      .from('notifications')
      .select('*, type:type(*)')
      .eq('id', invitationId)
      .single()) as SingleNotificationResponse;

    if (!notificationData) {
      return fail(400, {
        error: 'Failed to find invitation. Please try again!',
      });
    }

    if (notificationData.type.name === 'TEAM_INVITE') {
      let teamName: string;
      try {
        teamName = await handleTeamInviteAccept(
          locals.supabase,
          notificationData
        );
      } catch (e: any) {
        return fail(400, {
          error: e.message,
        });
      }
      throw redirect(302, `/teams/${teamName.toLowerCase()}`);
    } else if (notificationData.type.name === 'LOBBY_INVITE') {
      await handleLobbyInviteAccept(locals.supabase, notificationData);
    }
  },
};

async function handleTeamInviteAccept(
  supabase: SupabaseClient,
  notificationData: NotificationData
) {
  // Insert member into team members
  const { error } = await supabase.from('team_members').insert({
    team_id: notificationData.details.teamId,
    player_id: notificationData.recipient_id,
    role: notificationData.details.role,
  });

  if (error) {
    throw new Error('Failed to join team. Please try again!');
  }

  const { error: notificationError } = await supabase
    .from('notifications')
    .update({ status: 'ACCEPTED', updated_at: new Date() })
    .eq('id', notificationData.id);

  if (notificationError) {
    throw new Error('Failed to accept invitation. Please try again!');
  }

  return notificationData.details.teamName as string;
}

async function handleLobbyInviteAccept(
  supabase: SupabaseClient,
  notificationData: NotificationData
) {
  console.log(notificationData);

  return { code: 400, message: 'Not implemented yet', hint: '' };
}
