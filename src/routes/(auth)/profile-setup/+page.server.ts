import { redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { profileDetailsSchema } from '$lib/validations/zodShemas';
import { AuthApiError, type PostgrestError } from '@supabase/supabase-js';

export const load = async ({ parent }) => {
	const { session, authUser } = await parent();

	if (!session || (session && authUser !== null)) {
		throw redirect(302, '/');
	}

	const form = await superValidate(profileDetailsSchema);

	return {
		form,
	};
};

export const actions = {
	createProfile: async ({ request, locals }) => {
		const form = await superValidate(request, profileDetailsSchema);

		if (!form.valid) {
			return message(form, 'Invalid form');
		}

		const session = await locals.getSession();
		const { name, username } = form.data as Record<string, string>;

		const { data } = await locals.supabase
			.from('profiles')
			.select()
			.eq('uuid', session.user.id);

		let error: PostgrestError | null;
		if (data?.length === 1) {
			const { error: err } = await locals.supabase
				.from('profiles')
				.update({ name: name, username: username })
				.eq('uuid', session.user.id);

			error = err;
		} else {
			const { error: err } = await locals.supabase.from('profiles').insert({
				uuid: session.user.id,
				name: name,
				username: username,
				email: session.user.email,
			});

			error = err;
		}

		if (error) {
			if (error.code === '23505') {
				return message(form, 'Username already taken. Try another one');
			}
			if (error instanceof AuthApiError && error.status === 400) {
				return message(form, error.message);
			}
			return message(form, error.message);
			// return message(form, 'Server error. Please try again later');
		}

		throw redirect(302, '/');
	},
};
