export const load = async ({ locals }) => {
	const { data } = await locals.supabase.from('maps').select('name, thumbnail');

	return {
		maps: data,
	};
};
