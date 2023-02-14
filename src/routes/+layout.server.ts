import type { LayoutServerLoad } from "./$types";
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { browser } from "$app/environment";

export const prerender = false;

// @ts-ignore
export const load: LayoutServerLoad = async (event) => {
    const { session, supabaseClient } = await getSupabase(event);
    if (session && !browser) {
        console.time("root layout")
        const {data: tableData} = await event.locals.sb.from('users')
            .select('username, first_name, last_name, website, country, avatar_url')
            .eq('id', session.user.id)
            .single()

        return {
            session,
            user: {
                userData: tableData,
            },
        };
        console.timeEnd("root layout")
    }
}