import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
  const session = await locals.getSession()

  if (params.uuid !== session.user.id) {
    throw redirect(302, '/')
  }
};