import type { RequestHandler } from "@sveltejs/kit";
import { json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, locals: { supabase, getSession } }) => {
  const course = url.searchParams.get('course')
  const { data, error } = await supabase.rpc('get_course_grades', {p_course_id: course})
  console.log(data)
  return json(data)
}