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
  const user = url.searchParams.get('user')

  const { error, data: res, status } = await supabase.rpc('accept_into_course',
  	{_sender_id: session.user.id, _user_id: user, _course_id: course})
  console.log(error, res, status)


  return json({res, error, status})
}