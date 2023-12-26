// src/hooks.server.js
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import {redirect} from "@sveltejs/kit";
import {createServerClient} from "@supabase/ssr";
import { error, json, text, Handle } from '@sveltejs/kit';


// TODO SCHEMA MATERIAL

export const handle = async ({ event, resolve }) => {

  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    db: { schema: "public" },
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, options)
      },
      remove: (key, options) => {
        event.cookies.delete(key, options)
      },
    },
  })

  if (event.url.pathname.startsWith("/api")) {
    const session = event.locals.supabase.auth.getSession()
    if (!session) {
      throw redirect(303, '/auth')
    }
  }

  if (event.url.pathname.startsWith("/d")) {
    const session = event.locals.supabase.auth.getSession()
    if (!session) {
      throw redirect(303, '/auth')
    }
  }

  event.locals.getClaim = async () => {
    // This right now just checks if they are a claim admin.
    try {
      const {
        data: { session },
      } = await event.locals.supabase.auth.getSession()
      if (!session) {
        throw redirect(303, '/auth')
      } else {
        return session.user?.app_metadata.userrole
      }
    } catch(error) {
      console.log(error)
      return false
    }
  }

  event.locals.getLMSUserID = async () => {
    try {
      const {
        data: { session },
      } = await event.locals.supabase.auth.getSession()
      if (!session) {
        throw redirect(303, '/auth')
      } else {
        return session.user?.app_metadata.lms_user_id
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

  event.locals.getServerSession = async () => {
    const refreshToken = event.refresh_token
    const accessToken = event.access_token

    if (refreshToken && accessToken) {
      await event.supabase.auth.setSession({
        refresh_token: refreshToken,
        access_token: accessToken,
    })
    } else {
      // make sure you handle this case!
      throw new Error('User is not authenticated.')
    }

// returns user information
    await event.supabase.auth.getSession()
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })

};