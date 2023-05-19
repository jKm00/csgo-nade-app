import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession()

  return {
    session: await getSession()
  }
}