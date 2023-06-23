import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	delete: async ({ locals, url }) => {
		const stratId = url.searchParams.get('id');

		// fetch all image url from all nades in strat
		const { data } = await locals.supabase
			.from('nades')
			.select(
				`
				lineup_img ,
				impact_img ,
				strats ( id )
			`
			)
			.eq('strat_id', stratId);

		// delete all nade images
		if (data instanceof Array) {
			for (var nade of data) {
				if (nade.lineup_img) {
					await locals.supabase.storage
						.from('strats')
						.remove([`${nade.lineup_img}`]);
				}

				if (nade.impact_img) {
					await locals.supabase.storage
						.from('strats')
						.remove([`${nade.impact_img}`]);
				}
			}
		}

		// delete strat from strat tables
		// nades are cascade deleted
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
