import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession()

  // TODO: fetch user from public schema
  const user = null

  return {
    session: await getSession(),
    user
  }
}