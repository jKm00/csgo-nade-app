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
    } catch (err) {
      console.error(err)
    }
  }

  return {
    session,
    user
  }
};