import { registerSchema } from "$lib/validations/registerSchema.js";
import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from 'sveltekit-superforms/server';
import { prisma } from "$lib/server/prisma.js";

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

    const { username, fullName, email, password } = form.data as Record<string, string>

    // Sign up to supabase auth
    const { data, error: err } = await locals.supabase.auth.signUp({
      email,
      password,
    })

    // Catch any errors
    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, { 
          form,
          error: 'Invalid email or password' 
        })
      }
      return fail(500, { 
        form, 
        error: 'Server error. Please try again later' 
      })
    }

    // Create user profile
    try {
      await prisma.user.create({
        data: {
          uuid: data.user?.id ?? '',
          name: fullName,
          username: username,
          email: email,
          roles: {
            create: [{
              role: {
                connect: {
                  name: 'USER'
                }
              }
            }]
          }
        }
      })
    } catch (err) {
      console.log(err)
      return fail(400, {
        form,
        error: 'Failed to generate profile'
      })
    }

    throw redirect(302, '/verify')
  }
};