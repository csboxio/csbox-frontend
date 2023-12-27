import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
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