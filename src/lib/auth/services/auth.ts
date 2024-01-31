// src/services/auth.ts
import {combineChunks, createBrowserClient, isBrowser, parse} from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

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

export class AuthService {
    constructor(private fetch: any, private data: any) {}

    async init() {
        const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            serverSession: this.data.session,
            db: { schema: 'public' },
            global: {
                fetch: this.fetch,
            },
            auth: {
                autoRefreshToken: true,
                persistSession: true,
            },
            cookies: {
                get: this.getCookie.bind(this),
            },
            cookieOptions: {
                sameSite: 'none',
                secure: true,
                maxAge: 60 * 60,
            },
        });

        const {
            data: { session },
        } = await supabase.auth.getSession();

        return { supabase };
    }

    private getCookie(key: string) {
        if (!isBrowser()) {
            return JSON.stringify(this.data.session);
        }

        return combineChunks(key, (name) => {
            const cookies = parse(document.cookie);
            return cookies[name];
        });
    }
}