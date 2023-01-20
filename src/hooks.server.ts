import '$lib/utilities/supabaseClient';
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { Handle } from '@sveltejs/kit'
import { redirect } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

  // protect requests to all routes that start with /protected-routes
  if (event.url.pathname.startsWith('/api')) {
    const { session } = await getSupabase(event)
    if (!session) {
      throw redirect(303, '/');
    }
  }
  const { session, supabaseClient } = await getSupabase(event)

  event.locals.sb = supabaseClient
  event.locals.session = session

    if (session) {
        const {data: tableData} = await supabaseClient.from('users')
            .select('username, first_name, last_name, website, country, avatar_url')
            .eq('id', session.user.id)
            .single()
        event.locals.user = tableData
    }
  return resolve(event)
}
