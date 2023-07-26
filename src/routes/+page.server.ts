import type {Actions} from "./$types";
import {redirect} from '@sveltejs/kit'
import { browser } from "$app/environment";

export const prerender = false;
export const load = async ({ locals: { getSession, getClaim } }) => {
    const session = await getSession()
    if (session) {
        const claim = await getClaim()
        return {
            claim: claim,
        }
    }
}
export const actions: Actions = {
    signin: async ({ request, url, locals: { supabase } }) => {
        await supabase.auth.refreshSession()

        const formData = await request.formData()
            const captchaToken = formData.get('cf-turnstile-response') as string
            const email = formData.get('email') as string
            const password = formData.get('password') as string

            const { error: loginError, data } = await supabase.auth.signInWithPassword({
                email,
                password,
                options: { captchaToken },
            })

        throw redirect(303, '/')
    },
    updateProfile: async ({ request, url, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
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
        const {error} = await supabase.from('users').upsert(updates)
        throw redirect(303, '/')
    }
} satisfies Actions;