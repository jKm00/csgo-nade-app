import { loginSchema } from '$lib/validations/loginSchema.js';
import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

const OAUTH_PROVIDERS = ["github"]

export const load = async ({ locals }) => {
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
  login: async ({ request, locals, url }) => {
    const form = await superValidate(request, loginSchema)

    if (!form.valid) {
      return fail(400, {
        form
      })
    }

    const { email, password } = form.data as Record<string, string>

    const { error: err } = await locals.supabase.auth.signInWithPassword({
      email,
      password
    })

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, { 
          form, 
          error: 'Invalid credentials'
        })
      }
      return fail(500, { 
        form, 
        error: 'Server error. Please try again later' 
      })
    }

    throw redirect(302, '/')
  }
};