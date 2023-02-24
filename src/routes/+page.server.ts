import type {Actions} from "./$types";
import {redirect} from '@sveltejs/kit'
import {getSupabase} from '@supabase/auth-helpers-sveltekit'

export const prerender = false;
export const actions: Actions = {
    signin: async (event) => {
        const {request, cookies, url} = event
        const {session, supabaseClient} = await getSupabase(event)
        const formData = await request.formData()

        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const {error} = await event.locals.sb.auth.signInWithPassword({
            email,
            password,
        })

        throw redirect(303, '/')
    },

    updateProfile: async (event) => {
        const {request, cookies, url} = event
        const {supabaseClient} = await getSupabase(event)
        const formData = await request.formData()

        const {data} = await event.locals.sb.auth.refreshSession()
        const {session, user} = data

        const fullName = formData.get('name')
        const website = formData.get('website')

        const updates = {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            id: user.id,
            full_name: fullName,
            website: website,
            updated_at: new Date()
        }
        const {error} = await event.locals.sb.from('users').upsert(updates)
        throw redirect(303, '/')
    }
}