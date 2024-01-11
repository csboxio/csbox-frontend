import type { RequestHandler } from "@sveltejs/kit";
import { json, redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals: { supabase, getSession, getClaim } }) => {
  const course = url.searchParams.get('course')

  const { data, error } = await supabase
      .rpc('get_course_metrics', {_course_id: course});

  console.log(data, error)

  return json(data)
}