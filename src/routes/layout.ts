import type { LayoutServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from "$lib/supabaseClient";
import { onMount } from "svelte";

export const load: LayoutServerLoad = async (event) => {
  const { session } = await getSupabase(event);
  return { session };
};