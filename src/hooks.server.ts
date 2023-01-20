import '$lib/utilities/supabaseClient';
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { Handle } from '@sveltejs/kit'
import { redirect } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const { session, supabaseClient } = await getSupabase(event)

  // protect requests to all routes that start with /protected-routes
  if (event.url.pathname.startsWith('/api')) {
    const { session, supabaseClient } = await getSupabase(event);

    if (!session) {
      throw redirect(303, '/');
    }
  }

  event.locals.sb = supabaseClient
  event.locals.session = session

  return resolve(event)
}