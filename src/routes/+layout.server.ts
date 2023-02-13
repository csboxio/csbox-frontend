import type { LayoutServerLoad } from "./$types";
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { browser } from "$app/environment";

export const prerender = false;

// @ts-ignore
export const load: LayoutServerLoad = async (event) => {

}