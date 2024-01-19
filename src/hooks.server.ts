// src/hooks.server.js
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import {redirect} from "@sveltejs/kit";
import {createServerClient} from "@supabase/ssr";
import { error, json, text, Handle } from '@sveltejs/kit';
import {invalidateAll} from "$app/navigation";


export const handle: Handle = async ({ event, resolve, request }) => {
  console.log(`Incoming request: ${JSON.stringify(event)}}`);

  // Attempting to fix Rate limit exceeded with auth, this was not there before.
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    db: { schema: "public" },
    auth: {
      autoRefreshToken: false,
      persistSession: true,
    },
    cookies: {
      get: (key) => event.cookies.get(key),
      /**
       * Note: You have to add the `path` variable to the
       * set and remove method due to sveltekit's cookie API
       * requiring this to be set, setting the path to an empty string
       * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
       */
      set: (key, value, options) => {
        event.cookies.set(key, value, { ...options, path: '' })
      },
      remove: (key, options) => {
        event.cookies.delete(key, { ...options, path: '' })
      },
    },
    cookieOptions: {
      sameSite: 'none',
      secure: true
    }
  })

  if (event.url.pathname.startsWith("/api")) {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()

    if (!session) {
      throw redirect(303, '/auth')
    }
  }

  if (event.url.pathname.startsWith("/d")) {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()

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

      if (session)
        return session.user?.app_metadata.userrole

    } catch(error) {
      throw redirect(303, '/auth')
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

  /*event.locals.getServerSession = async () => {
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
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }*/

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */

  event.locals.getSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    return session;
  };

  /**
   *   event.locals.getSession = async () => {
   *     try {
   *       const {
   *         data: { session }
   *       } = await event.locals.supabase.auth.getSession();
   *
   *       if (!session) {
   *         return null
   *       }
   *
   *       // Fetch user data from the Supabase Auth server
   *       const { user, error } = await event.locals.supabase.auth.getUser();
   *
   *       if (error) {
   *         // Invalidate session, sign out, and redirect to /auth
   *         await event.locals.supabase.auth.signOut();
   *         // Redirect to the authentication page (adjust the path as needed)
   *         console.log('error')
   *       }
   *
   *       // Compare session data with user data
   *       const sessionUserId = session?.user?.id;
   *       const serverUserId = user?.id;
   *
   *       if (sessionUserId && serverUserId && sessionUserId === serverUserId) {
   *         return session;
   *       } else {
   *         console.warn('Session and user data do not match.');
   *         // Invalidate session, sign out, and redirect to /auth
   *         await event.locals.supabase.auth.signOut();
   *         // Redirect to the authentication page (adjust the path as needed)
   *
   *       }
   *
   *     } catch (error) {
   *       console.error('Error fetching session:', error);
   *       // Invalidate session, sign out, and redirect to /auth
   *       await event.locals.supabase.auth.signOut();
   *       // Redirect to the authentication page (adjust the path as needed)
   *
   *     }
   *   };
   *
   */



  const { error: getSessionError } = await event.locals.supabase.auth.getSession()
  if (getSessionError) {
    console.error(getSessionError)
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    }
  });

};