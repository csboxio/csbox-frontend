import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {


  const assignment_id = url.searchParams.get('assignment_id')
  const {data, error } = await supabase.from('assignments')
    .update({assignment_id: assignment_id, published: true, })
      .eq('assignment_id', assignment_id)

  console.log(error)

  //event.setHeaders({
  //  'cache-control': 'public, max-age=60, s-maxage=60'
  //})

  return json(data)
}