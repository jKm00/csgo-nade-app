import type { LayoutLoad, LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params, locals }) => {
  // TODO: Fetch profile from supabase
  const { data } = await locals.supabase.from('profiles').select().eq('uuid', params.uuid)

  return {
    profile: data ? data[0] : null
  }
};