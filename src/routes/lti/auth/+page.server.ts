import type {Actions} from "./$types";
import {redirect} from '@sveltejs/kit'
import { browser } from "$app/environment";

export const prerender = false;

// SSR should be off at the moment.
export const ssr = false
export const csr = true

export const load = async ({ locals: { getSession, getClaim, getLMSUserID, supabase } }) => {
    const session = await getSession()
    await supabase.auth.refreshSession()
    return {
        session
    }
}
