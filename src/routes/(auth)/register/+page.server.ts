import { prisma } from "$lib/server/prisma";
import { registerSchema } from "$lib/validations/registerSchema.js";
import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from 'sveltekit-superforms/server';


export const load = async ({ locals }) => {
  const session = await locals.getSession()
  if (session) {
    throw redirect(302, '/')
  }

  const form = await superValidate(registerSchema)
  return {
    form
  }
};

export const actions = {
  registerUser: async ({ request, locals }) => {
    const form = await superValidate(request, registerSchema)

    if (!form.valid) {
      return fail(400, {
        form
      })
    }

    const { email, username, password } = form.data as Record<string, string>

    // Try to create user
    const { error: err } = await locals.supabase.auth.signUp({
      email,
      password
    })

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, { error: 'Invalid email or password' })
      }
      return fail(500, { error: 'Server error. Please try again later' })
    }

    // Add user to database
    try {
      await prisma.user.create({
        data: {
          email,
          username,
          roles: {
            create: [
              {
                role: {
                  connect: {
                    name: 'USER'
                  }
                }
              }
            ]
          }
        }
      })
    } catch (err) {
      return fail(500, { message: 'Failed to save user' })
    }

    throw redirect(302, '/')
  }
};