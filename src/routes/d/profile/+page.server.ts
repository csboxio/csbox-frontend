import type {Actions} from "./$types";
import {redirect} from '@sveltejs/kit'
import {getSupabase} from '@supabase/auth-helpers-sveltekit'

export const prerender = false;
export const actions: Actions = {
    updateProfile: async (event) => {
        const {request} = event
        const {supabaseClient} = await getSupabase(event)
        const formData = await request.formData()

        const {data} = await supabaseClient.auth.refreshSession()
        const {session, user} = data

        if (!session || !user) {
            throw redirect(303, '/')
        }
        const fullName = formData.get('first')
        const lastName = formData.get('last_name')
        const website = formData.get('website')

        const updates = {
            id: user.id,
            first_name: fullName,
            last_name: lastName,
            website: website,
            updated_at: new Date()
        }

        const {error} = await supabaseClient.from('users').upsert(updates)
        console.log(error)

        throw redirect(303, '/d')
    }
}