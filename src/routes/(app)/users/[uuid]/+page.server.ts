import type { User } from '@prisma/client';
import { prisma } from '$lib/server/prisma.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
  let profile: User | null
  try {
    profile = await prisma.user.findUnique({
      where: {
        uuid: params.uuid
      }
    })
  } catch (err) {
    return fail(404, { error: 'User nout found' })
  }

  return {
    profile: profile
  }
};