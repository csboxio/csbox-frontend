import {json} from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

export const GET = async (event) => {
    const { locals: { getSession }, setHeaders } = event

    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
        {
            db: { schema: 'private' }
        });

    //await supabase.auth.refreshSession()
    const session = await getSession()

    if (!session) {
        return json({message: 'No session'})
    }

    if (session) {
        const {data, error, status} = await supabase.from('users')
            .select('updated_at, username, first_name, last_name, website, avatar_url, bio, country, completed_setup')
            .eq('id', session.user.id)
            .single()

        setHeaders({
            'cache-control': 'public, max-age=3600, s-maxage=3600'
        })

        return json({data})
    }
    return
}