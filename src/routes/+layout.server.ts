import type { LayoutServerLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

// @ts-ignore
export const load: LayoutServerLoad = async (event) => {
    const { session, supabaseClient } = await getSupabase(event);
    if (session) {
        const { data: tableData } = await supabaseClient.from('users')
            .select('username, first_name, last_name, website, country, avatar_url')
            .eq('id', session.user.id)
            .single()

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
