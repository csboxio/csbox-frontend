import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {createSupabaseServerClient} from "@supabase/auth-helpers-sveltekit";
import {DEV} from "../../../lib/dev/mode.js";



// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, setHeaders, url, locals: { getSession }, event }) => {

    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
        {
            db: { schema: 'private' },
            auth: {
                persistSession: false,
            }
        });
    await supabase.auth.refreshSession()


  const session = await getSession()
  if (session) {
    const {data, error, status} = await supabase.from('users')
        .select('updated_at, username, first_name, last_name, website, avatar_url, bio, country, completed_setup')
        .eq('id', session.user.id)
        .single()

      setHeaders({
        'cache-control': 'public, max-age=300, s-maxage=300'
      })


    return json({data})
  }

    return new Response('An error occurred (500)');


}