import {json} from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {page} from "$app/stores";

export const GET = async (event) => {
    const { locals: { getSession }, setHeaders } = event

    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
        {
            db: { schema: 'public' }
        });

    //await supabase.auth.refreshSession()
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

        setHeaders({
            'cache-control': 'public, max-age=60, s-maxage=60'
        })

        return json({data})
    }
    return
}