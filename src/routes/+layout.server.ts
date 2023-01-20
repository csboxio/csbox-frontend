import type { LayoutServerLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
// @ts-ignore
export const load: LayoutServerLoad = async (event) => {
    const { session, supabaseClient } = await getSupabase(event);
    if (session) {


        return {
            session,
            user: {
                sessionUser: session.user,
                userData: event.locals.user,
                name: "test",
            },
        };
    }
}
