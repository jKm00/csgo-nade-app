import { registerSchema } from "$lib/validations/registerSchema.js";
import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from 'sveltekit-superforms/server';

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
      return message(form, 'Invalid form')
    }

    const { username, fullName, email, password } = form.data as Record<string, string>

    // Sign up to supabase auth
    const { data, error: err } = await locals.supabase.auth.signUp({
      email,
      password,
    })

    console.log(err)

    // Catch any errors
    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return message(form, err.message, {
          status: 400
        })
      }
      return message(form, 'Server error. Please try again later', {
        status: 500
      })
    }

    // Create user profile
    const { error: userError } = await locals.supabase.from('profiles').insert({
        uuid: data.user!.id,
        name: fullName,
        username: username,
        email: email,
      })

    if (userError) {
      return message(form, 'Failed to create user. Please try again later', {
        status: 500
      })
    }

    throw redirect(302, '/verify')
  }
};