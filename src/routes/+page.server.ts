import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const prerender = 'auto';
export const load: PageServerLoad = async ( {locals}) => {
  const { data, error: err } = await locals.sb.auth.getSession()
  if (err) {
    throw error(500, err?.message)
  }
}
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

    const fullName = formData.get('name')
    const website = formData.get('website')

    const updates = {
      // @ts-ignore
      id: user.id,
      full_name: fullName,
      website: website,
      updated_at: new Date()
    }
    let { error } = await supabaseClient.from('users').upsert(updates)
    throw redirect(303, '/')
  }
}