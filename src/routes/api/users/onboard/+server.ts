import type { RequestHandler } from "@sveltejs/kit";
import {json, redirect} from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

export const GET: RequestHandler = async ({ request, setHeaders, url, locals: { getSession }, event }) => {
    const session = await getSession()
    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
        {
            db: { schema: 'private' }
        });
    //await supabase.auth.refreshSession()

    console.log(session)
    if (session) {
        const {data, error, status} = await supabase.from('users')
            .select('completed_setup')
            .eq('id', session.user.id)
            .single()

        console.log(data, error, status)

        return json({data})
    }
}