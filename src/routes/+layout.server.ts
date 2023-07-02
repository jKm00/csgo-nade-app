import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.getSession();
	const { data } = await locals.supabase
		.from('profiles')
		.select()
		.eq('uuid', session?.user?.id);

	// FIXME: Don't think does anything atm.
	// The redirect is happening in +layout.svelte.
	if (session && data === null) {
		throw redirect(302, '/profile-setup');
	}

	return {
		session,
		authUser: data !== null && data.length > 0 ? data[0] : null,
	};
};
