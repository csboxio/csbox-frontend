import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/');
  }
  const course = url.searchParams.get('course')
  const {data, error } = await supabase.from('grades')
    .select('course_id, graded_by, user_id, last_graded, points_given, points, grade_percent')
    .eq('course_id', course)
      .eq('user_id', session.user.id)

  if (error) {
    console.log(data, error)
  }

  //event.setHeaders({
  //  'cache-control': 'public, max-age=60, s-maxage=60'
  //})

  return json(data)
}