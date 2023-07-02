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
  // created_by = user_id
  const { error, data: res, status } = await supabase.rpc('new_enroll_code',
    {course_id: course, created_by: session.user.id})

  console.log(error, res, status)


  return json({res, error, status})
}