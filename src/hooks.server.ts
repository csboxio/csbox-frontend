// src/hooks.server.js
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import {redirect} from "@sveltejs/kit";
import {createServerClient} from "@supabase/ssr";
import { error, json, text, Handle } from '@sveltejs/kit';


// TODO SCHEMA MATERIAL

const csrf = (allowedPaths: string[]): Handle => async ({ event, resolve }) => {
          const forbidden =
              event.request.method === 'POST' &&
              event.request.headers.get('origin') !== event.url.origin &&
              isFormContentType(event.request) &&
              !allowedPaths.includes(event.url.pathname);

          if (forbidden) {
            const csrfError = error(
                403,
                `Cross-site ${event.request.method} form submissions are forbidden`,
            );
            if (event.request.headers.get('accept') === 'application/json') {
              return json(csrfError.body, { status: csrfError.status });
            }
            return text(csrfError.body.message, { status: csrfError.status });
          }

          return resolve(event);
        };
function isContentType(request: Request, ...types: string[]) {
  const type = request.headers.get('content-type')?.split(';', 1)[0].trim() ?? '';
  return types.includes(type);
}
function isFormContentType(request: Request) {
  return isContentType(request, 'application/x-www-form-urlencoded', 'multipart/form-data');
}

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
  await csrf(['/api-lti/login'])({ event, resolve });

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })

};