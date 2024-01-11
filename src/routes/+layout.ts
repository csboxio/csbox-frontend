// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'

import type {Database} from "../schema.js";

import { combineChunks, createBrowserClient, isBrowser, parse } from '@supabase/ssr'
import type {LayoutLoad} from "./$types.js";

export const load: LayoutLoad = async ({ fetch, data, depends }) => {

  /*
  * Warning:
  * auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
    * The above is needed, for LMS external tool usage, but its required.
    *
    * I'm pretty sure that autoRefreshToken needs to be true, but on main page it creates an issue where it never stops refreshing
    * (Could have been a random dev mode problem, because I can't recreate it) .*/

  const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    serverSession: data.session,
    db: { schema: 'public' },
    global: {
      fetch,
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
    cookies: {
      get(key) {
        if (!isBrowser()) {
          return JSON.stringify(data.session)
        }

        const cookie = combineChunks(key, (name) => {
          const cookies = parse(document.cookie)
          return cookies[name]
        })
        return cookie
      },
    },
    cookieOptions: {
      sameSite: 'none',
      secure: true,
    }
  })

  return { supabase }
}