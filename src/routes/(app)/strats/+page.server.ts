import { stratSchema } from '$lib/validations/zodShemas';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ url, locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(302, '/');
	}

	const form = superValidate(stratSchema);
	const map = url.searchParams.get('map');

	return {
		form,
		map,
	};
};
