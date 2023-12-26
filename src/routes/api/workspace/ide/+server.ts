import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, setHeaders, url, locals: { supabase, getSession }, event }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/');
  }
  const version = url.searchParams.get('v')

  const {data, error } = await supabase.from('ide')
    .select('version, status_codes, config, type, language, storage')
    .eq('version', version)
      .single()

  if (error) {
    //console.log(data, error)
  }


  return json(data)
}