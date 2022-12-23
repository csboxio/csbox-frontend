import type { Actions } from './$types'
import { error, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { AuthApiError } from '@supabase/supabase-js'

import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
  signin: async (event) => {
    const { request, cookies, url } = event
    const { session, supabaseClient } = await getSupabase(event)
    const formData = await request.formData()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })
    console.log(data, error)
  },
}
