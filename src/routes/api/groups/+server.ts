import type { RequestHandler } from "@sveltejs/kit";
import { json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, setHeaders, locals: { supabase, getSession } }) => {
  const course = url.searchParams.get('course')
  const { data, error } = await supabase
      .rpc('get_groups_assignments', { course_id_param: course });

  //console.log(data, error)

  return json(data)
}