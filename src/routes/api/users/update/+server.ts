import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {createServerClient} from "@supabase/ssr";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ event, request, locals: { getSession } }) => {

    const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        db: { schema: "private" },
        auth: {
            autoRefreshToken: true,
            persistSession: true,
        },
        cookies: {},
    })
    await supabase.auth.refreshSession()

    const session = await getSession()
    console.log(session.user.id)
  if (session) {
      const updates = await request.json();
      console.log(updates)

      const {data, error, status} = await supabase
          .from('users')
          .update(updates)
          .eq('id', session.user.id)

      console.log(data, error, status)
    return json({data})
  }

}