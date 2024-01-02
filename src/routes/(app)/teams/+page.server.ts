import { teamSchema } from '$lib/validations/zodShemas.js';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		redirect(302, '/');
	}

	const form = superValidate(teamSchema);

	return {
		form,
	};
};

export const actions = {
	createTeam: async ({ request, locals }) => {
		const form = await superValidate(request, teamSchema);

		if (!form.valid) {
			return fail(400, {
				form,
				error: 'Invalid form',
			});
		}

		const session = await locals.getSession();
		const { name, org, role } = form.data as Record<string, string>;

		// Fetch userid from session
		const { data: userData } = await locals.supabase
			.from('profiles')
			.select('id')
			.eq('uuid', session.user.id);

		if (userData === null) {
			return fail(400, {
				form,
				error: 'Could not find user to assign as leader',
			});
		}

		// Create team
		const { data, error: err } = await locals.supabase
			.from('teams')
			.insert({
				name: name,
				organization: org,
				team_leader: userData[0].id,
			})
			.select();

		// Check for errors when creating team
		if (err) {
			if (err.code === '23505') {
				return fail(400, {
					form,
					error: 'Team name already taken',
				});
			}
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					form,
					error: err.message,
				});
			}
			return fail(500, {
				form,
				error: 'Server error. Please try again later',
			});
		}

		// Create first team member
		const { error: memberError } = await locals.supabase
			.from('team_members')
			.insert({
				team_id: data[0].id,
				player_id: userData[0].id,
				role,
			});

		if (memberError) {
			return fail(400, {
				form,
				error: 'Failed to add member',
			});
		}

		redirect(302, `/teams/${name.toLowerCase()}`);
	},
};
