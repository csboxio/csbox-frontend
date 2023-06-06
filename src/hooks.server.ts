import '$lib/utilities/supabaseClient';
import type { Handle } from '@sveltejs/kit'
import { redirect } from "@sveltejs/kit";
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
    options: {
      realtime: {
        params: {
          eventsPerSecond: 5
        }
      },
    }
  },
  )

  /**
   * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  if (event.url.pathname.startsWith('/api')) {
    const session = await event.locals.getSession()
    if (!session) {
      // the user is not signed in
      throw redirect(303, '/')
    }
  }

  if (event.url.pathname.startsWith('/d')) {
    const { session } = await event.locals.getSession();
    if (!session) {
      throw redirect(303, '/');
    }


  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })


  }
  return resolve(event)
}
