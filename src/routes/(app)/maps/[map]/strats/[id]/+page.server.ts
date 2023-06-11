import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	delete: async ({ locals, url }) => {
		const stratId = url.searchParams.get('id');

		const { error } = await locals.supabase
			.from('strats')
			.delete()
			.eq('id', stratId);

		if (error) {
			console.log(error);
			return fail(400, {
				message: 'Something went wrong. Please try again later!',
			});
		}

		throw redirect(302, '/');
	},
};
