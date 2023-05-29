import { fail } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const { data } = await locals.supabase
		.from('profile_pictures')
		.select('id, filename');

	return {
		images: data,
	};
};

export const actions = {
	updateProfilePicture: async ({ locals, url }) => {
		const session = await locals.getSession();

		if (!session) {
			return fail(401, { error: 'Unauthorized' });
		}

		const profilePicture = url.searchParams.get('picture');

		if (!profilePicture) {
			return fail(400, { error: 'No profile picture selected' });
		}

		const { error } = await locals.supabase
			.from('profiles')
			.update({ profile_picture: Number(profilePicture) })
			.eq('uuid', session.user.id);

		if (error) {
			return fail(400, {
				error: 'Something went wrong. Please try again later',
			});
		}

		return { success: 'Updated profile picture' };
	},
};
