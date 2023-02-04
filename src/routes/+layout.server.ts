import type { LayoutServerLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const prerender = 'auto';

// @ts-ignore
export const load: LayoutServerLoad = async (event) => {
    const { session, supabaseClient } = await getSupabase(event);
    if (session) {


        return {
            session,
            user: {
                userData: event.locals.user
            },
        };
    }
}
