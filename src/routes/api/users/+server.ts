import {json} from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

export const GET = async (event) => {
    const { locals: { getSession } } = event

    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
        {
            db: { schema: 'private' }
        });

    //await supabase.auth.refreshSession()
    const session = await getSession()

    if (session) {
        const {data, error, status} = await supabase.from('users')
            .select('updated_at, username, first_name, last_name, website, avatar_url, bio, country, completed_setup')
            .eq('id', session.user.id)
            .single()

        return json({data})
    }
    console.log(session)
}