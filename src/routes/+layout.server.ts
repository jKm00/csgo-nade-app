import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	const { data } = await locals.supabase
		.from('profiles')
		.select()
		.eq('uuid', session?.user?.id);

	return {
		session,
		authUser: data !== null && data.length > 0 ? data[0] : null,
	};
};
