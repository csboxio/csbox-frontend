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


  const group_id = url.searchParams.get('group_id')
  const {data, error } = await supabase.from('groups')
    .update({id: group_id, published: true, })
      .eq('id', group_id)

  console.log(error)

  //event.setHeaders({
  //  'cache-control': 'public, max-age=60, s-maxage=60'
  //})

  return json(data)
}