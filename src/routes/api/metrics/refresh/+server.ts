import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const course = url.searchParams.get('course')

  const { data, error } = await supabase
      .rpc('refresh_course_metrics', {course_id: course});

  console.log(data, error)

  return json(data)
}