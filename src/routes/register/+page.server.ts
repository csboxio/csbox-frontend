import type { Actions } from './$types'
import { error, fail, redirect } from "@sveltejs/kit";
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { AuthApiError } from '@supabase/supabase-js'

export const actions: Actions = {
  signup: async ({request, locals}) => {
    const body = Object.fromEntries(await request.formData())

    const { error: err } = await locals.sb.auth.signUp({
      email: body.email as string,
      password: body.password as string,
    })
    if (err) {
      if (err instanceof  AuthApiError && err.status == 400) {
        return fail(400, {
          error: 'Invalid email or password'
        })
      }
      return fail(500, {
        error: 'Server error. Please try again later.'
      })
    }

    throw redirect(303, '/')
  }
}
