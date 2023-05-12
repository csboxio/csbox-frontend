import '$lib/utilities/supabaseClient';
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { Handle } from '@sveltejs/kit'
import { redirect } from "@sveltejs/kit";
export const handle: Handle = async ({ event, resolve }) => {
  const { session, supabaseClient } = await getSupabase(event)
  event.locals.sb = supabaseClient
  event.locals.session = session

  // protect requests to all routes that start with /api
  if (event.url.pathname.startsWith('/api')) {
    const { session } = await getSupabase(event)
    if (!session) {
      throw redirect(303, '/');
    }
  }

  if (event.url.pathname.startsWith('/d')) {
    const { session } = await getSupabase(event)
    if (!session) {
      throw redirect(303, '/');
    }

  }
  return resolve(event)
}
