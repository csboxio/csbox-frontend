import type {Actions, PageServerLoad} from "./$types";
import { error, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import {uuid} from "@supabase/supabase-js/dist/module/lib/helpers";


export const actions: Actions = {
  createCourse: async (event) => {
    const { request } = event
    const { supabaseClient } = await getSupabase(event)
    const formData = await request.formData()

    const { data } = await supabaseClient.auth.refreshSession()
    const { session, user } = data

    const text = formData.get('text')
    if (user != null) {
      const updates = {
        id: Math.floor(Math.random() * 9999999999),
        inserted_at: new Date(),
        slug: text,
        created_by: user.id,
      }
      const { error } = await supabaseClient.from('courses').insert(updates)
    }

    throw redirect(303, '/dashboard/courses')
  }
}