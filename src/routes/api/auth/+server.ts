import { supabaseClient } from "$lib/utilities/supabaseClient";
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../../.svelte-kit/types/src/routes/$types";

const load: PageServerLoad = async ( {locals }) => {
  const { data, error: err } = await locals.sb.auth.getSession()
  if (err) {
    throw error(500, err?.message)
  }
}