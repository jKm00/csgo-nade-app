import { prisma } from "$lib/server/prisma";

export const load = async () => {
  const fetchUsers = async () => {
    return await prisma.user.findMany({
      include: {
        roles: {
          include: {
            Role: true
          }
        }
      }
    })
  }

  return {
    users: fetchUsers()
  }
};