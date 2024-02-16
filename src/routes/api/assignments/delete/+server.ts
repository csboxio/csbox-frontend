import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, locals: { supabase} }) => {
  const assignment_id = url.searchParams.get('assignment_id')

  const { data ,error } = await supabase.from('assignments').delete().eq('assignment_id', assignment_id);
  console.log(data, error)

  console.log('assignment delete')

  return json(data)
}