import type { LayoutLoad, LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, locals }) => {
	// TODO: Fetch profile from supabase
	const { data } = await locals.supabase
		.from('profiles')
		.select()
		.eq('uuid', params.uuid);

	const { data: url } = await locals.supabase.storage
		.from('profile_picture')
		.getPublicUrl('');

	return {
		imgBaseUrl: `${url.publicUrl.slice(0, -1)}s`,
		profile: data ? data[0] : null,
	};
};
