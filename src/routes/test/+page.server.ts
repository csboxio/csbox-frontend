import type { Actions } from './$types'
import { error, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { AuthApiError } from '@supabase/supabase-js'
import { supabaseClient } from "$lib/supabaseClient";

export const actions: Actions = {
  updateProfile: async (event) => {
    const { request, cookies, url } = event
    const { supabaseClient } = await getSupabase(event)
    const formData = await request.formData()

    const { data } = await supabaseClient.auth.refreshSession()
    const { session, user } = data

    console.log(user)

    const fullName = formData.get('full_name') as string
    const website = formData.get('website') as string
    const avatarUrl = formData.get('url') as string

    const updates = {
      id: user.id,
      full_name: fullName,
      website: website,
      avatar_url: avatarUrl,
      updated_at: new Date()
    }

    let { error } = await supabaseClient.from('profiles').upsert(updates)


    throw redirect(303, '/')
  }
}
