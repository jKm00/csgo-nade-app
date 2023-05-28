import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { session, authUser } = await parent();

	if (session && authUser === null) {
		throw redirect(302, '/profile-setup');
	}
};
