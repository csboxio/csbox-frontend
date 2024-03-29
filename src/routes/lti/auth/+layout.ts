// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'

import type {Database} from "../schema.js";

import { combineChunks, createBrowserClient, isBrowser, parse } from '@supabase/ssr'
import type {LayoutLoad} from "./$types.js";

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
    depends('supabase:auth')

    /*
    * Warning:
    * auth: {
        autoRefreshToken: true,
        persistSession: false,
      },
      * Adding the above is unknown if it breaks client, or fixes, (for embedded) */

    const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        serverSession: data.session,
        db: { schema: 'material' },
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


    const {
        data: { session },
    } = await supabase.auth.getSession()

    return { supabase, session }
}