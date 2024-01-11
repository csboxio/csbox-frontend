import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, setHeaders, locals: { supabase, getSession, getClaim } }) => {
  const course = url.searchParams.get('course')

  const { data, error } = await supabase
      .rpc('get_modules_assignments_quizzes', { course_id_param: course });

  setHeaders({
    'cache-control': 'public, max-age=5, s-maxage=5'
  })
  return json(data)
}