import { APP_BASE_URL } from '$env/static/private';
import { forgotPasswordEmailSchema } from '$lib/validations/zodShemas';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async () => {
	const form = await superValidate(forgotPasswordEmailSchema);

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, forgotPasswordEmailSchema);

		if (!form.valid) {
			return message(form, 'Invalid form');
		}

		const { email } = form.data as Record<string, string>;

		try {
			const { data, error } = await locals.supabase.auth.resetPasswordForEmail(
				email,
				{
					redirectTo: `${APP_BASE_URL}/login/new-password`,
				}
			);

			if (error) {
				return message(form, 'Something went wrong. Please try again!');
			}

			return message(form, 'Email sent', {
				status: 200,
			});
		} catch (err) {
			return message(form, 'Something went wrong. Please try again!');
		}
	},
};
