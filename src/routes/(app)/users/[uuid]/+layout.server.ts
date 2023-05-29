import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, locals }) => {
	// TODO: Fetch profile from supabase
	const { data } = await locals.supabase
		.from('profiles')
		.select('*, profile_picture ( filename )')
		.eq('uuid', params.uuid);

	// Convert data to get proper typing on profile picture
	const profile = data
		? data.map((d) => {
				return {
					id: d.id,
					uuid: d.uuid,
					name: d.name,
					username: d.username,
					email: d.email,
					insertedAt: d.inserted_at,
					updatedAt: d.updated_at,
					profilePicture: d.profile_picture as { filename: string },
				};
		  })[0]
		: null;

	return {
		profile: profile,
	};
};
