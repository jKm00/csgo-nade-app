import { invitePlayerSchema } from '$lib/validations/zodShemas.js';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ params, locals }) => {
	const teamName = params.team;

	const form = superValidate(invitePlayerSchema);

	const team = await locals.supabase
		.from('teams')
		.select(
			`
			id,
			name,
			created_at,
			organization,
			profiles ( uuid, username )
		`
		)
		.ilike('name', teamName);

	let teamMembers = null;
	if (team.data && team.data.length > 0) {
		teamMembers = await locals.supabase
			.from('team_members')
			.select(
				`
				role,
				inserted_at,
				profiles ( id, uuid, username, email )
			`
			)
			.eq('team_id', team.data[0].id);
	}

	return {
		form,
		team: team.data && team.data.length > 0 ? team.data[0] : null,
		teamMembers: teamMembers?.data ?? null,
	};
};

export const actions = {
	invitePlayer: async ({ request, locals }) => {
		const form = await superValidate(request, invitePlayerSchema);

		// Validate form
		if (!form.valid) {
			return message(form, 'Invalid form');
		}

		const { username, teamId, role } = form.data;

		// Fetch user id based on username
		const { data: userData } = await locals.supabase
			.from('profiles')
			.select('id')
			.eq('username', username);

		// Make sure user was found
		if (!userData || userData.length === 0) {
			return fail(400, {
				form,
				message: `No user found with username '${username}'`,
			});
		}

		// Make sure user is not already invited
		const { data } = await locals.supabase
			.from('team_invitations')
			.select('*')
			.eq('team_id', teamId)
			.eq('player_id', userData[0].id);

		if (data && data.length > 0) {
			return fail(400, {
				form,
				message: `${username} is already invited to this team!`,
			});
		}

		// Invite user
		const { error } = await locals.supabase.from('team_invitations').insert({
			team_id: Number(teamId),
			player_id: userData[0].id,
			team_role: role,
		});

		if (error) {
			return fail(400, {
				form,
				message: 'Failed to invite player. Please try again',
			});
		}

		return { form, success: 'User invited' };
	},
	kickPlayer: async ({ request, locals, url }) => {
		const form = await request.formData();
		const playerId = form.get('playerId');
		const teamId = form.get('teamId');

		const { data, error: err } = await locals.supabase
			.from('team_members')
			.delete()
			.eq('team_id', teamId)
			.eq('player_id', playerId);

		if (err) {
			console.log(err);
			return fail(401, { message: 'Unauthorized' });
		}

		return { success: 'Player was kicked' };
	},
	leaveTeam: async ({ request, locals, url }) => {
		const session = await locals.getSession();

		const form = await request.formData();
		const teamId = form.get('teamId');

		// Fetch user id based on uuid
		const { data, error: userError } = await locals.supabase
			.from('profiles')
			.select('id')
			.eq('uuid', session.user.id);

		if (userError) {
			return fail(400, {
				message: 'Something went wrong. Please try again later',
			});
		}

		// Delete row from team members
		const { error: err } = await locals.supabase
			.from('team_members')
			.delete()
			.eq('team_id', teamId)
			.eq('player_id', data && data.length > 0 ? data[0].id : -1);

		if (err) {
			if (err.code === '22P02') {
				return fail(400, { message: 'Invalid user' });
			}
			return fail(401, { message: 'Unauthorized' });
		}

		throw redirect(302, url.pathname);
	},
};
