import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from "$lib/supabaseClient";
import { onMount } from "svelte";

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await getServerSession(event)
  };
};