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
		const { error: err } = await locals.supabase.auth.signInWithPassword({
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

		const redirectTo = url.searchParams.get('redirectTo') ?? '/';

		throw redirect(302, redirectTo);
	},
};
