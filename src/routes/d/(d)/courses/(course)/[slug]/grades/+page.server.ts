import type {PageServerLoadEvent} from "./$types"
import {getSupabase} from '@supabase/auth-helpers-sveltekit'

export const prerender = false;
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
    const {session, supabaseClient} = await getSupabase(event);
    if (session) {


    }
};