import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const load: PageServerLoad = async ( {locals}) => {
  const { data, error: err } = await locals.sb.auth.getSession()
  if (err) {
    throw error(500, err?.message)
  }
}

export const actions: Actions = {

  updateProfile: async (event) => {
    const { request, cookies, url } = event
    const { supabaseClient } = await getSupabase(event)
    const formData = await request.formData()

    const { data } = await supabaseClient.auth.refreshSession()
    const { session, user } = data

    const fullName = formData.get('first_name')
    const lastName = formData.get('last_name')
    const website = formData.get('website')

    const updates = {
      // @ts-ignore
      id: user.id,
      first_name: fullName,
      last_name: lastName,
      website: website,
      updated_at: new Date()
    }

    console.log(updates)

    // @ts-ignore
    let { error } = await supabaseClient.from('profiles').upsert(updates)


    throw redirect(303, '/profile')
  }
}