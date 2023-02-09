import type {Actions, PageServerLoad} from "./$types";
import { error, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const prerender = false;
export const actions: Actions = {
  updateProfile: async (event) => {
    const { request } = event
    const { supabaseClient } = await getSupabase(event)
    const formData = await request.formData()

    const { data } = await supabaseClient.auth.refreshSession()
    const { session, user } = data

    const fullName = formData.get('first')
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

    // @ts-ignore
    let { error } = await supabaseClient.from('users').upsert(updates)


    throw redirect(303, '/dashboard/courses')
  }
}