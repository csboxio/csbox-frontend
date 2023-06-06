import type {Actions} from "./$types";
import {redirect} from '@sveltejs/kit'
import { browser } from "$app/environment";
import { checkToken } from "$lib/utilities/validateToken.js";


export const prerender = false;
export const actions: Actions = {
    signin: async (event) => {

        const {request, cookies, url} = event

        const formData = await request.formData()

        const token = formData.get('cf-turnstile-response')?.toString()

        if (!browser) {
            const check = await checkToken(token)
            if (!check)
                throw redirect(303, '/')
        }


        const email = formData.get('email') as string
        const password = formData.get('password') as string
        // Works
        const captchaToken = formData.get('token') as string



        const {error: loginError, data} = await event.locals.supabase.auth.signInWithPassword({
            email,
            password,
            options: { captchaToken },
        })

        console.log(data.session, loginError)





        throw redirect(303, '/')
    },

    updateProfile: async (event) => {
        const {request, cookies, url} = event
        const formData = await request.formData()

        const {data} = await event.locals.supabase.auth.refreshSession()
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
        const {error} = await event.locals.supabase.from('users').upsert(updates)
        throw redirect(303, '/')
    }
}