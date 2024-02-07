import {json, RequestHandler} from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {page} from "$app/stores";

export const GET: RequestHandler = async ({ locals: { supabase, getSession, getClaim } }) => {
    const session = await getSession()

    if (!session) {
        return json({ message: 'No session' })
    }

    if (session) {
        const { data, error } = await supabase
            .from("notifications")
            .select("all_notifications")
            .eq('user_id', session.user.id)
            .single()

        return json({data})
    }
    return
}