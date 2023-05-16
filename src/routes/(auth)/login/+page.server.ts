import { loginSchema } from '$lib/validations/loginSchema.js';
import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect, type ServerLoad } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

const OAUTH_PROVIDERS = ["github"]

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
  login: async ({ request, locals, url }) => {
    const provider = url.searchParams.get('provider') as Provider

    if (provider) {
      if (!OAUTH_PROVIDERS.includes(provider)) {
        return fail(400, { error: 'Provider not supported'})
      }
      const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
        provider: provider
      })

      if (err) {
        return fail(400, { message: 'Something went wrong' })
      }

      throw redirect(303, data.url)
    }

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