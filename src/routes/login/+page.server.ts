import type { Actions } from './$types'
import { error, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const actions: Actions = {
  signin: async (event) => {
    const { request, cookies, url } = event
    const { session, supabaseClient } = await getSupabase(event)

    const formData = await request.formData()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

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

    console.log(updates)

    // @ts-ignore
    let { error } = await supabaseClient.from('users').upsert(updates)


    throw redirect(303, '/')
  }
}