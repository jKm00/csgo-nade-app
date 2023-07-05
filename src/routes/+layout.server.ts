import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.getSession();
	const { data } = await locals.supabase
		.from('profiles')
		.select()
		.eq('uuid', session?.user?.id)
		.single();

	return {
		session,
		authUser: data,
	};
};
