import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, locals: { supabase} }) => {
  const assignment_id = url.searchParams.get('assignment_id')

  const {data, error } = await supabase
      .schema('public')
      .from('assignments')
      .update({ published: true })
      .eq('assignment_id', assignment_id)

  console.log(assignment_id, data, error)

  return json(data)
}