import { prisma } from '$lib/server/prisma.js';

export const load = async ({ parent }) => {
  const { session } = await parent()

  let user = null
  if (session) {
    try {
      user = await prisma.user.findUnique({
        where: {
          email: session.user.email
        },
        include: {
          roles: {
            include: {
              role: true
            }
          }
        }
      })

      if (!user) {
        await prisma.user.create({
          data: {
            email: session.user.email!,
            username: session.user.email!
          }
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return {
    user
  }
};