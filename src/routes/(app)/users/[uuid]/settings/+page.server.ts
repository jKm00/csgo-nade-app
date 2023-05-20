import { emailSchema, updateUserDetailsSchema } from "$lib/validations/zodShemas";
import { AuthApiError } from "@supabase/supabase-js";
import { message, superValidate } from "sveltekit-superforms/server";

export const load = async ({ parent }) => {
  const { profile } = await parent()

  const userDetailsForm = await superValidate(updateUserDetailsSchema, {
    id: 'userDetailsForm'
  })
  userDetailsForm.data.fullName = profile?.name ?? ''
  userDetailsForm.data.username = profile?.username ?? ''

  const emailForm = await superValidate(emailSchema, {
    id: 'emailForm'
  })
  emailForm.data.email = profile?.email ?? ''

  return {
    userDetailsForm,
    emailForm
  }
};

export const actions = {
  updateUserDetails: async ({ request, locals }) => {
    const session = await locals.getSession()

    const userDetailsForm = await superValidate(request, updateUserDetailsSchema, {
      id: 'userDetailsForm'
    })

    if (!userDetailsForm.valid) {
      return message(userDetailsForm, 'Invalid form')
    }

    const { username, fullName } = userDetailsForm.data as Record<string, string>

    const { error: err } = await locals.supabase
      .from('profiles')
      .update({ username, name: fullName })
      .eq('uuid', session.user.id)

    if (err) {
      if (err.code === '23505') {
        return message(userDetailsForm, 'Username already taken', {
          status: 409
        })
      }
      if (err instanceof AuthApiError && err.status === 400) {
        return message(userDetailsForm, err.message, {
          status: 400
        })
      }
      return message(userDetailsForm, 'Server error. Please try again later', {
        status: 500
      })
    }

    return message(userDetailsForm, 'User details updated', {
      status: 200
    })
  }
};