import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	const session = await locals.getSession();

	if (!session || params.uuid !== session.user.id) {
		throw redirect(302, '/');
	}

	const { data: userData } = await locals.supabase
		.from('profiles')
		.select('id')
		.eq('uuid', session.user.id);

	if (!userData || userData.length === 0) {
		throw redirect(302, '/');
	}

	const { data } = await locals.supabase
		.from('team_invitations')
		.select(
			`
      id,
			player_id,
			team_role,
      teams ( name, organization )
    `
		)
		.eq('player_id', userData[0].id);

	return {
		invitations: data,
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
			.from('team_invitations')
			.delete()
			.eq('id', invitationId);

		if (error) {
			console.log(error);
			return fail(400, {
				error: error.message,
			});
		}

		return { success: 'Invitation successfully declined' };
	},
	accept: async ({ request, locals }) => {
		const invitationId = (await request.formData()).get('invitationId');

		if (!invitationId) {
			return fail(400, {
				error: 'Failed to find invitation. Please try again!',
			});
		}

		// Fetch additional data from invitations
		const { data: invitationData } = await locals.supabase
			.from('team_invitations')
			.select(
				`
				id,
				player_id,
				team_role,
				teams ( id, name )
			`
			)
			.eq('id', invitationId);

		// Make sure additional data is correct
		if (!invitationData || invitationData.length === 0) {
			return fail(400, {
				error: 'Failed to find invitation. Please try again!',
			});
		}

		const teamData = invitationData[0].teams as { id: number; name: string };
		const teamId = teamData.id;
		const teamName = teamData.name;
		const { player_id: playerId, team_role: teamRole } = invitationData[0];

		if (teamId === null || playerId === null) {
			return fail(400, {
				error: 'Something went wrong. Please try again!',
			});
		}

		// Insert member into team members
		const { error } = await locals.supabase.from('team_members').insert({
			team_id: teamId,
			player_id: playerId,
			role: teamRole,
		});

		if (error) {
			return fail(400, {
				error: 'Failed to join team. Please try again!',
			});
		}

		throw redirect(302, `/teams/${teamName.toLowerCase()}`);
	},
};
