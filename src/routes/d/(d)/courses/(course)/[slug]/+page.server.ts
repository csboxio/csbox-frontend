import type {PageServerLoadEvent} from "./$types"
import {getSupabase} from '@supabase/auth-helpers-sveltekit'
import {goto} from "$app/navigation";
import {redirect} from "@sveltejs/kit";

export const ssr = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/** @type {import('./$types').PageServerLoadEvent} */

export const load: PageServerLoadEvent = async (event) => {
    const {session, supabaseClient} = await getSupabase(event);
    if (session) {

    }

};

