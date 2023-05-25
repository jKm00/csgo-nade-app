import { teamSchema } from '$lib/validations/zodShemas.js';
import { AuthApiError } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(302, '/');
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
			return message(form, 'Invalid form');
		}

		const session = await locals.getSession();
		const { name } = form.data as Record<string, string>;

		// Fetch userid from session
		const { data: userData } = await locals.supabase
			.from('profiles')
			.select('id')
			.eq('uuid', session.user.id);

		if (userData === null) {
			return message(form, 'Could not find user to assign as leader');
		}

		// Create team
		const { data, error: err } = await locals.supabase
			.from('teams')
			.insert({
				name: name,
				team_leader: userData[0].id,
			})
			.select();

		// Check for errors when creating team
		if (err) {
			if (err.code === '23505') {
				return message(form, 'Team name already taken', {
					status: 400,
				});
			}
			if (err instanceof AuthApiError && err.status === 400) {
				return message(form, err.message, {
					status: 400,
				});
			}
			return message(form, 'Server error. Please try again later', {
				status: 500,
			});
		}

		const { error: memberError } = await locals.supabase
			.from('team_members')
			.insert({
				team_id: data[0].id,
				player_id: userData[0].id,
				role: form.data.role,
			});

		if (memberError) {
			console.log(memberError);
			return message(form, 'Failed to add member', {
				status: 400,
			});
		}

		throw redirect(302, `/teams/${name}`);
	},
};
