import type {Actions} from "./$types";
import {redirect} from '@sveltejs/kit'
import { browser } from "$app/environment";

export const prerender = false;

export const ssr = false
export const actions: Actions = {
    signin: async ({ request, url, locals: { supabase } }) => {
        if (!browser) {
            console.log('here')
            const formData = await request.formData()
            const captchaToken = formData.get('cf-turnstile-response') as string
            const email = formData.get('email') as string
            const password = formData.get('password') as string

            const { error: loginError, data } = await supabase.auth.signInWithPassword({
                email,
                password,
                options: { captchaToken },
            })

            console.log(loginError, data)
        }

        throw redirect(303, '/')
    },
    updateProfile: async ({ request, url, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        const {session, user} = data
        const first_name = formData.get('name')
        const website = formData.get('website')
        const updates = {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            first_name: first_name,
            website: website,
            updated_at: new Date()
        }
        const {error} = await supabase.from('users').update(updates).eq('id', user.id)
        console.log(error)
        throw redirect(303, '/')
    }
}