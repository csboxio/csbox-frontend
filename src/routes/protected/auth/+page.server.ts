import type {Actions} from "./$types";
import {redirect} from "@sveltejs/kit";

export const ssr = true


export const prerender = false;
export const actions: Actions = {
    master_auth: async ({request, url, locals: {supabase}}) => {
        await supabase.auth.refreshSession()

        const formData = await request.formData()
        //const captchaToken = formData.get('cf-turnstile-response') as string
        //const email = formData.get('email') as string
        //const password = formData.get('password') as string



        throw redirect(303, '/')
    },
}