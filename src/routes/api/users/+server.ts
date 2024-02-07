import {json} from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

export const GET = async (event) => {
    const { locals: { getSession }, setHeaders } = event

    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
        {
            db: { schema: 'private' }
        });

    setHeaders({
        "cache-control": "max-age=60",
    });


    //await supabase.auth.refreshSession()
    const session = await getSession()

    if (!session) {
        return json({ message: 'No session' })
    }

        const {data, error, status} = await supabase.from('users')
            .select('updated_at, username, first_name, last_name, website, avatar_url, bio, country, completed_setup')
            .eq('id', session.user.id)
            .single()

        return json({ data })
}