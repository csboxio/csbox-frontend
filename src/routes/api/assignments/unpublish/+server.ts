import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const assignment_id = url.searchParams.get('assignment_id')

  const {data, error } = await supabase.from('assignments')
      .update({assignment_id: assignment_id, published: false, })
      .eq('assignment_id', assignment_id)


  return json(data)
}