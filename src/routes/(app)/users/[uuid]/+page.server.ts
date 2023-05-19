import { fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
  // TODO: Fetch profile from supabase
  const profile = null

  return {
    profile
  }
};