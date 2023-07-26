// src/hooks.server.js
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import {redirect} from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
    db: { schema: 'material' },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    }
  })

  if (event.url.pathname.startsWith("/api")) {
    const session = event.locals.supabase.auth.getSession()
    if (!session) {
      throw redirect(303, '/')
    }
  }

  if (event.url.pathname.startsWith("/d")) {
    const session = event.locals.supabase.auth.getSession()
    if (!session) {
      throw redirect(303, '/')
    }
  }

  event.locals.getClaim = async () => {
    // This right now just checks if they are a claim admin.
    try {
      const {
        data: { session },
      } = await event.locals.supabase.auth.getSession()
      if (!session) {
        throw redirect(303, '/')
      } else {
        return session.user?.app_metadata.userrole
      }
    } catch(error) {
      console.log(error)
      return false
    }
  }

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}