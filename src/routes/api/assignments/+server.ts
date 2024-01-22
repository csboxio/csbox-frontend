import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const course = url.searchParams.get('course')

  const {data, error} = await supabase.from('assignments')
    .select('assignment_id, title, category, due, points, order_in_group')
    .eq('course_id', course)

  return json(data)
}