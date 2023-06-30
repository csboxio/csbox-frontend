import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {createSupabaseServerClient} from "@supabase/auth-helpers-sveltekit";


// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, locals: { getSession } }) => {
    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
        {
            db: { schema: 'private' },
            auth: {
                persistSession: false,
            }
        });
  const session = await getSession()
  if (session) {
      const updates = await request.json();
      const {data, error, status} = await supabase.from('users')
        .upsert(updates)
      console.log(data,error,status)
    return json({data})
  }

}