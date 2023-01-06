import type { Actions } from './$types'
import { error, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { AuthApiError } from '@supabase/supabase-js'

export const actions: Actions = {
  signup: async (event) => {
    const { request, cookies, url } = event
    const { session, supabaseClient } = await getSupabase(event)
    const formData = await request.formData()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
    })

    throw redirect(303, '/')
  }
}
