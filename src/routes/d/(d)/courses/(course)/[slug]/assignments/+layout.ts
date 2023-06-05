import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { supabaseClient } from "$lib/utilities/supabaseClient.js";
import { browser } from "$app/environment";
export const ssr = false
export const prerender = true
export const load = (async (  event ) => {
  const {session } = await getSupabase(event);
  if (session) {
    const response = await event.fetch(`/api/assignments/?course=${event.params.slug}`)

    return {
      assignments: {
        assignmentData: await response.json()
      },
    };
  }
});