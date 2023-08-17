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

  const { data, error } = await supabase.rpc('get_submissions_with_grades', { in_course_id: c_id, in_assignment_id: a_id})

  if (error) {
    console.log(data, error)
  }

  //event.setHeaders({
  //  'cache-control': 'public, max-age=60, s-maxage=60'
  //})

  return json(data)
}