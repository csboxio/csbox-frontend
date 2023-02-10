import type { Actions } from './$types'
import { error, fail, redirect } from "@sveltejs/kit";
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { AuthApiError } from "@supabase/supabase-js";

export const prerender = false;
export const actions: Actions = {
  signin: async ({request, locals}) => {
    const body = Object.fromEntries(await request.formData())

    const { error: err } = await locals.sb.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string,
    })
    if (err) {
      console.log(err)
      if (err instanceof  AuthApiError && err.status == 400) {
        return fail(400, {
          error: 'Invalid credentials'
        })
      }
      return fail(500, {
        error: 'Server error. Please try again later.'
      })
    }

    throw redirect(303, '/')
  },

  updateProfile: async (event) => {
    const { request, cookies, url } = event
    const { supabaseClient } = await getSupabase(event)
    const formData = await request.formData()

    const { data } = await supabaseClient.auth.refreshSession()
    const { session, user } = data
    if (!session) {
      throw redirect(303, '/');
    }

    const fullName = formData.get('name')
    const website = formData.get('website')

    const updates = {
      // @ts-ignore
      id: user.id,
      full_name: fullName,
      website: website,
      updated_at: new Date()
    }

    // @ts-ignore
    let { error } = await supabaseClient.from('users').upsert(updates)


    throw redirect(303, '/')
  }
}