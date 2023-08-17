import type { User } from '$lib/features/navBar/types/User';
import { loginSchema } from '$lib/validations/zodShemas';
import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect, type ServerLoad } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

const OAUTH_PROVIDER = ['github', 'discord'];

export const load: ServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
	if (session) {
		throw redirect(302, '/');
	}

	const redirectTo = url.searchParams.get('redirectTo');

	const form = await superValidate(loginSchema);
	return {
		form,
		redirectTo,
	};
};

export const actions = {
	login: async ({ request, locals, url }) => {
		const form = await superValidate(request, loginSchema);
		const provider = url.searchParams.get('provider') as Provider;

		// Sign in with OAUTH
		if (provider) {
			if (!OAUTH_PROVIDER.includes(provider)) {
				return message(form, 'Provider not supported', {
					status: 400,
				});
			}

			const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
				provider: provider,
			});

			if (err) {
				return message(form, err.message, {
					status: 400,
				});
			}

			throw redirect(303, data.url);
		}

		// Validate form
		if (!form.valid) {
			return message(form, 'Invalid form');
		}

		const { email, password } = form.data as Record<string, string>;

		// Sign in with form
		const { data, error: err } = await locals.supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return message(form, 'Invalid credentials', {
					status: 400,
				});
			}
			return message(form, 'Server error. Please try again later.', {
				status: 500,
			});
		}

		// Fetch details fo signed in user
		const { data: user } = await locals.supabase
			.from('profiles')
			.select('id, uuid, name, username, profile_picture ( filename )')
			.eq('uuid', data.user.id)
			.single();

		if (!user) {
			return message(form, 'Something went wrong. Please try again.', {
				status: 500,
			});
		}

		const redirectTo = url.searchParams.get('redirectTo') ?? '/';

		// FIXME: Currently returning status 500 so I can catch the values on the client.
		// For some reason, it redirects to home page on success (200) making me unable to use the
		// values before redirecting manually.
		return message(
			form,
			{
				user: user as unknown as User,
				session: data.session,
				redirectTo,
			},
			{
				status: 500,
			}
		);
	},
};
