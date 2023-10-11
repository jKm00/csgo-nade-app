import { reportBugSchema } from '$lib/validations/zodShemas';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async () => {
  const form = superValidate(reportBugSchema);

  return {
    form,
  };
};

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, reportBugSchema);

    // Validate form
    if (!form.valid) {
      return message(form, 'Invalid form');
    }

    const { title, description } = form.data;

    // Get user id
    const session = await locals.getSession();
    const uuid = session.user.id;

    const { data } = await locals.supabase
      .from('profiles')
      .select('id')
      .eq('uuid', uuid)
      .single();

    if (data === null) {
      return fail(400, {
        message: 'Something went wrong. Please try again!',
        form,
      });
    }

    // Insert report to db
    const { error } = await locals.supabase.from('bug_reports').insert({
      title,
      description,
      user_id: data.id,
    });

    if (error) {
      console.log(error);
      return fail(500, {
        message: 'Something went wrong. Please try again later!',
        form,
      });
    }

    // Reset form fields
    form.data.title = '';
    form.data.description = '';

    return {
      form,
      success:
        "Thank you for submitting the report! We'll take contact if we need more information",
      message: null as null | string,
    };
  },
};
