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
  const c_id = url.searchParams.get('c_id')
  const a_id = url.searchParams.get('a_id')

  console.log(c_id, a_id)

  const {data, error } = await supabase.from('submissions')
    .select('id, course_id, graded_by, assignment_id, last_graded, user_id, grade_percent, points_given, points, type')
    .eq('course_id', c_id)
      .eq('user_id', session.user.id)
      .eq('assignment_id', a_id)

  console.log(data, error)
  if (error) {
    console.log(data, error)
  }

  //event.setHeaders({
  //  'cache-control': 'public, max-age=60, s-maxage=60'
  //})

  return json(data)
}