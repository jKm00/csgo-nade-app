import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
  const session = await locals.getSession()

  if (!session || params.uuid !== session.user.id) {
    throw redirect(302, '/')
  }
};