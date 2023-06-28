import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";


// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, url, locals: { getSession }, event }) => {
  const [_, access_token] = request.headers.get('Authorization')?.split(' ') ?? [];
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  await supabase.auth.setSession({access_token, refresh_token: ''});


  const session = await getSession()
  if (!session) {
    throw redirect(303, '/');
  }
  const {data, error} = await supabase.from('users')
    .select('updated_at, username, first_name, last_name, website, avatar_url')
    .eq('id', session.user?.id)
    .single()

  console.log(error, session.user?.id)


  return json({data})
}