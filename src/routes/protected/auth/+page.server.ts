import type {Actions} from "./$types";
import {redirect} from "@sveltejs/kit";
import {goto} from "$app/navigation";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

export const ssr = true


export const prerender = false;
export const actions: Actions = {
    master_auth: async ({request, url, locals: { getSession }}) => {

        const formData = await request.formData()
        const captchaToken = formData.get('cf-turnstile-response') as string
        const password = formData.get('password') as string

        const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
            {
                db: { schema: 'internal' },
                auth: {
                    persistSession: false,
                }
            });

        const { data, error } = await supabase.auth.refreshSession()
        console.log(data, error)

        const session = await getSession();

        console.log(session)
    },
}
