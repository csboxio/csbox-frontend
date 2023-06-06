import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
  const session = await getSession()
  if (!session) {
    throw redirect(303, '/');
  }
  const {data, error} = await supabase.from('users')
    .select('updated_at, username, first_name, last_name, website, avatar_url')
    .eq('id', session.user?.id)
    .single()


  return json({data})
}