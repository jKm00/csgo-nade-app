import { invitePlayerSchema } from '$lib/validations/zodShemas.js';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ params, locals }) => {
	const form = superValidate(invitePlayerSchema);

	const fetchTeam = async (name: string) => {
		const { data } = await locals.supabase
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
			.ilike('name', name)
			.single();

		const teamMembers = await locals.supabase
			.from('team_members')
			.select(
				`
				role,
				inserted_at,
				profiles ( id, uuid, username, email )
			`
			)
			.eq('team_id', data?.id);

		const team = {
			...data,
			members: teamMembers.data,
		};

		return team;
	};

	const fetchStrats = async (team: string) => {
		const { data: teamId } = await locals.supabase
			.from('teams')
			.select(`id`)
			.eq('name', team)
			.single();

		const { data: strats } = await locals.supabase
			.from('strats')
			.select(
				`
				*,
				profiles (username),
				maps (name),
				positions (img, name),
				teams (name)
			`
			)
			.eq('team_id', teamId?.id);

		const { data, count } = await locals.supabase
			.from('strats')
			.select('*', { count: 'exact', head: true })
			.eq('team_id', teamId?.id);

		return {
			strats:
				strats?.map((strat) => ({
					id: strat.id,
					name: strat.name,
					authorUsername:
						strat.profiles instanceof Array
							? strat.profiles[0].username
							: strat.profiles?.username ?? '',
					thumbnail:
						strat.positions instanceof Array
							? `/maps/${
									strat.maps instanceof Array
										? strat.maps[0].name.toLowerCase()
										: strat.maps?.name.toLowerCase() ?? ''
							  }/${strat.positions[0].img}`
							: strat.positions
							? `/maps/${
									strat.maps instanceof Array
										? strat.maps[0].name.toLowerCase()
										: strat.maps?.name.toLowerCase()
							  }/${strat.positions.img}`
							: undefined,
					createdAt: new Date(strat.inserted_at),
					side: strat.team_side,
					position:
						strat.positions instanceof Array
							? strat.positions[0].name
							: strat.positions
							? strat.positions.name
							: undefined,
					map:
						strat.maps instanceof Array
							? strat.maps[0].name
							: strat.maps?.name ?? '',
					team:
						strat.teams instanceof Array
							? strat.teams[0].name
							: strat.teams?.name ?? undefined,
				})) ?? [],
			count,
		};
	};

	return {
		form,
		team: fetchTeam(params.team),
		lazy: {
			strats: fetchStrats(params.team),
		},
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

		const { error: err } = await locals.supabase
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
	transferLeader: async ({ request, locals }) => {
		const session = await locals.getSession();

		const form = await request.formData();
		const teamId = form.get('teamId');
		const playerId = form.get('playerId');

		if (teamId === null || playerId === null) {
			return fail(400, { message: 'Something went wrong. Please try again!' });
		}

		const { error } = await locals.supabase
			.from('teams')
			.update({
				team_leader: Number(playerId),
			})
			.eq('id', teamId);

		if (error) {
			if (error.code === '42501') {
				return fail(401, { message: 'Unauthorized' });
			}
			return fail(400, {
				message: 'Failed to transfer leader. Please try again!',
			});
		}

		return { success: 'Leader transfered!' };
	},
	deleteTeam: async (event) => {
		const { request, locals } = event;

		const form = await request.formData();
		const teamId = form.get('teamId');

		if (teamId === null) {
			return fail(400, { message: 'Something went wrong. Please try again! ' });
		}

		const { error } = await locals.supabase
			.from('teams')
			.delete()
			.eq('id', teamId);

		if (error) {
			console.log(error);
			return fail(400, {
				message: 'Failed to delete team. Plesae try again!',
			});
		}

		throw redirect(302, '/');
	},
};
