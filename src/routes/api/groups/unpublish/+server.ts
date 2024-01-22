import type { RequestHandler } from "@sveltejs/kit";
import { json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, locals: { supabase, getSession } }) => {
  const group_id = url.searchParams.get('group_id')
  const {data, error } = await supabase.from('groups')
    .update({id: group_id, published: false, })
      .eq('id', group_id)

  console.log(error)

  //event.setHeaders({
  //  'cache-control': 'public, max-age=60, s-maxage=60'
  //})

  return json(data)
}