import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

export const GET: RequestHandler = async ({ request, setHeaders, url, locals: { getSession }, event }) => {
    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
        {
            db: { schema: 'private' },
            auth: {
                persistSession: false,
            }
        });
    await supabase.auth.refreshSession()
    const session = await getSession()
    if (session) {
        const {data, error, status} = await supabase.from('users')
            .select('completed_setup')
            .eq('id', session.user.id)
            .single()

        return json({data})
    }
    return new Response('An error occurred (500)');
}