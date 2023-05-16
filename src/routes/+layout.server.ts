import type { User } from "@prisma/client";
import type { LayoutServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession()

  let user: User | null = null
  if (session) {
    try {
      user = await prisma.user.findUnique({
        where: {
          uuid: session.user.id
        }
      })
    } catch (err) {
      console.log(`No user found with it: ${session.user.id}`)
    }
  }


  return {
    session: await getSession(),
    user
  }
}