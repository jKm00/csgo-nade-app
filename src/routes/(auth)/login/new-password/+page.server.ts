import { forgotPasswordUpdateSchema } from '$lib/validations/zodShemas.js';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ url, locals }) => {
	const form = superValidate(forgotPasswordUpdateSchema);

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const session = await locals.getSession();
		const form = await superValidate(request, forgotPasswordUpdateSchema);

		if (!session) {
			return message(
				form,
				'Unathorized. Go back to login page and request the forgot password option one more time.',
				{ status: 401 }
			);
		}

		if (!form.valid) {
			return message(form, 'Invalid form');
		}

		const { newPassword } = form.data as Record<string, string>;

		try {
			const { data, error } = await locals.supabase.auth.updateUser({
				password: newPassword,
			});

			if (error) {
				return message(form, 'Something went wrong. Please try again!');
			}

			return message(form, 'Password successfully changed!');
		} catch (err) {
			return message(form, 'Something went wrong. Please try again');
		}
	},
};
