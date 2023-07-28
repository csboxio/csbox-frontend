import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, url, locals: { getSession, supabase }, event }) => {
    const session = await getSession()

    if (session) {
        const { data, error } = await supabase.from('messages')
            .select('id, sender_id, receiver_id, message, sent_at')
            .eq('receiver_id', session.user.id)


        if (error) {
            console.log(error)
        }

        return json({data})
    }

    return
}