import { registerSchema } from '$lib/validations/zodShemas';
import { AuthApiError } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ locals }) => {
	const session = await locals.getSession();
	if (session) {
		throw redirect(302, '/');
	}

	const form = await superValidate(registerSchema);
	return {
		form,
	};
};

export const actions = {
	registerUser: async ({ request, locals }) => {
		const form = await superValidate(request, registerSchema);

		// Validate form
		if (!form.valid) {
			return message(form, 'Invalid form');
		}

		const { username, fullName, email, password } = form.data;

		// Make sure username and email is available
		const { data: user, error } = await locals.supabase.rpc(
			'get_profiles_by_username_or_email',
			{
				input_username: username,
				input_email: email,
			}
		);

		// Handle taken username or email
		if (user && user.length > 0) {
			let errorMsg =
				'Something went wrong. Please try again or contact support!';
			if (user[0].username === username && user[0].email === email) {
				errorMsg = 'Username and email is taken! Try something else.';
			} else if (user[0].username === username) {
				errorMsg = 'Username is already taken! Try another.';
			} else if (user[0].email === email) {
				errorMsg = 'Email is already taken! Try another.';
			}
			return message(form, errorMsg, {
				status: 400,
			});
		}

		// Sign up to supabase auth
		const { data, error: err } = await locals.supabase.auth.signUp({
			email,
			password,
		});

		// Handle auth errors
		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return message(form, err.message, {
					status: 400,
				});
			}
			return message(form, 'Server error. Please try again later', {
				status: 500,
			});
		}

		// Create profile
		const { error: userError } = await locals.supabase.from('profiles').insert({
			uuid: data.user!.id,
			name: fullName,
			username: username,
			email: email,
		});

		// Handle profile errors
		if (userError) {
			return message(form, 'Failed to create user. Please try again later', {
				status: 500,
			});
		}

		// Redirect
		throw redirect(302, '/verify');
	},
};
