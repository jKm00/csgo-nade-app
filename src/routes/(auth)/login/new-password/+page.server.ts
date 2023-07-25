import { forgotPasswordUpdateSchema } from '$lib/validations/zodShemas.js';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ url, locals }) => {
	const form = superValidate(forgotPasswordUpdateSchema);

	const code = url.searchParams.get('code');

	if (code === null) {
		redirect(302, '/');
	}

	await locals.supabase.auth.exchangeCodeForSession(code!);

	return { form };
};
