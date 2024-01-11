import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const module_id = url.searchParams.get('module_id')
  const {data, error } = await supabase.from('modules')
    .update({id: module_id, published: true, })
      .eq('id', module_id)

  console.log(error)

  return json(data)
}