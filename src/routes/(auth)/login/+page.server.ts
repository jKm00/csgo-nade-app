import { loginSchema } from '$lib/validations/zodShemas';
import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect, type ServerLoad } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load: ServerLoad = async ({ locals }) => {
  const session = await locals.getSession()
  if (session) {
    throw redirect(302, '/')
  }

  const form = await superValidate(loginSchema)
  return {
    form
  }
};

export const actions = {
  login: async ({ request, locals }) => {
    const form = await superValidate(request, loginSchema)

    if (!form.valid) {
      return message(form, 'Invalid form')
    }

    const { email, password } = form.data as Record<string, string>

    const { error: err } = await locals.supabase.auth.signInWithPassword({
      email,
      password
    })

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return message(form, 'Invalid credentials', {
          status: 400
        })
      }
      return message(form, 'Server error. Please try again later.', {
        status: 500
      })
    }

    throw redirect(302, '/')
  }
};