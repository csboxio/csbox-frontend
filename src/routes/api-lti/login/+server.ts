import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ cookies, request, url, setHeaders, locals: { getSession }, event }) => {

    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
        {
            auth: {
                persistSession: false,
            }
        });

    const email = url.searchParams.get('email')
    const password = url.searchParams.get('password')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log(error)
    return json({success: true})
}