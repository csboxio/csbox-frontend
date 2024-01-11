import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const group_id = url.searchParams.get('group_id')
  const {data, error } = await supabase.from('groups')
    .update({id: group_id, published: true, })
      .eq('id', group_id)

  console.log(error)

  return json(data)
}