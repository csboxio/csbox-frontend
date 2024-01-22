import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/');
  }
  const course = url.searchParams.get('course')
  const user = url.searchParams.get('user')

  const { error, data: res, status } = await supabase.rpc('accept_into_course',
  	{student_id: user, instructor_id: session.user.id, course_id: course})
  console.log(error, res, status)


  return json({res, error, status})
}