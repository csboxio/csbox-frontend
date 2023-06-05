import type { RequestHandler } from "@sveltejs/kit";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, json, redirect } from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    throw redirect(303, '/');
  }
  const {data, error} = await event.locals.sb.from('users')
    .select('updated_at, username, first_name, last_name, website, avatar_url')
    .eq('id', session.user?.id)
    .single()

  event.setHeaders({
    'cache-control': 'public, max-age=300, s-maxage=300'
  })


  return json(data)
}