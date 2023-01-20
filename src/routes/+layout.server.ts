import type { LayoutServerData } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type {Session} from "@supabase/supabase-js";

import type { LayoutServerLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect } from "@sveltejs/kit";

// @ts-ignore
export const load: LayoutServerLoad = async (event) => {
    const { session, supabaseClient } = await getSupabase(event);
    if (session) {
        const { data: tableData } = await supabaseClient.from('users')
            .select('username, first_name, last_name, website, country, avatar_url')
            .eq('id', session.user.id)
            .single()
        console.log("this", tableData)
        return {
            session,
            user: {
                sessionUser: session.user,
                userData: tableData,
                name: "test",
            },
        };
    }
}
