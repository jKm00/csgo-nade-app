import {
	changePasswordSchema,
	emailSchema,
	updateUserDetailsSchema,
} from '$lib/validations/zodShemas';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ locals, params, parent }) => {
	const session = await locals.getSession();

	if (!session || params.uuid !== session.user.id) {
		throw redirect(302, '/');
	}

	const { profile } = await parent();

	const userDetailsForm = await superValidate(updateUserDetailsSchema, {
		id: 'userDetailsForm',
	});
	userDetailsForm.data.fullName = profile?.name ?? '';
	userDetailsForm.data.username = profile?.username ?? '';

	const emailForm = await superValidate(emailSchema, {
		id: 'emailForm',
	});
	emailForm.data.email = profile?.email ?? '';

	const passwordForm = await superValidate(changePasswordSchema, {
		id: 'updatePassword',
	});

	return {
		userDetailsForm,
		emailForm,
		passwordForm,
	};
};

export const actions = {
	updateUserDetails: async ({ request, locals }) => {
		const session = await locals.getSession();

		const userDetailsForm = await superValidate(
			request,
			updateUserDetailsSchema,
			{
				id: 'userDetailsForm',
			}
		);

		if (!userDetailsForm.valid) {
			return message(userDetailsForm, 'Invalid form');
		}

		const { username, fullName } = userDetailsForm.data as Record<
			string,
			string
		>;

		const { error: err } = await locals.supabase
			.from('profiles')
			.update({ username, name: fullName })
			.eq('uuid', session.user.id);

		if (err) {
			if (err.code === '23505') {
				return message(userDetailsForm, 'Username already taken', {
					status: 409,
				});
			}
			if (err instanceof AuthApiError && err.status === 400) {
				return message(userDetailsForm, err.message, {
					status: 400,
				});
			}
			return message(userDetailsForm, 'Server error. Please try again later', {
				status: 500,
			});
		}

		return message(userDetailsForm, 'User details updated', {
			status: 200,
		});
	},
	updateEmail: async ({ request, locals }) => {
		const session = await locals.getSession();

		// Validate form
		const emailForm = await superValidate(request, emailSchema, {
			id: 'emailForm',
		});

		if (!emailForm.valid) {
			return message(emailForm, 'Invalid form');
		}

		const { email } = emailForm.data as Record<string, string>;

		if (session.user.email === email) {
			return message(emailForm, 'Can not change to the same email!', {
				status: 400,
			});
		}

		// Update auth user
		const { error: err } = await locals.supabase.auth.updateUser({ email });

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return message(emailForm, err.message, {
					status: 400,
				});
			}
			return message(emailForm, 'Server error. Please try again later', {
				status: 500,
			});
		}

		return message(emailForm, 'Verification link sent to the new email', {
			status: 200,
		});
	},
	updatePassword: async ({ request, locals }) => {
		// Validate form
		const passwordForm = await superValidate(request, changePasswordSchema, {
			id: 'updatePassword',
		});

		if (!passwordForm.valid) {
			return message(passwordForm, 'Invalid form');
		}

		const { currentPassword, newPassword } = passwordForm.data as Record<
			string,
			string
		>;

		// Try to update password
		const { error: err } = await locals.supabase.rpc('change_user_password', {
			current_plain_password: currentPassword,
			new_plain_password: newPassword,
		});

		// Catch errors after trying
		if (err) {
			if (err.code === 'P0001') {
				setError(passwordForm, 'currentPassword', 'Incorrect password');
				return message(passwordForm, 'Incorrect password', {
					status: 400,
				});
			}
			return message(passwordForm, 'Server error. Please try again later', {
				status: 500,
			});
		}

		// Password changed
		return message(passwordForm, 'Password has been changed', {
			status: 200,
		});
	},
	deleteUser: async ({ locals }) => {
		const session = await locals.getSession();

		// Check if user is a team leader
		const { data } = await locals.supabase
			.from('teams')
			.select(`*, profiles (uuid)`)
			.eq('profiles.uuid', session.user.id)
			.single();

		if (data) {
			return fail(400, {
				message: 'Could not delete the account as you are a leader for a team',
			});
		}

		// Delete user
		const { error: err } = await locals.supabaseAdmin.auth.admin.deleteUser(
			session.user.id
		);

		// Return any errors
		if (err) {
			return fail(400, {
				message: 'Something went wrong. Please try again later',
			});
		}

		// Log out user
		await locals.supabase.auth.signOut();

		// Redirect to home page
		throw redirect(302, '/');
	},
};
