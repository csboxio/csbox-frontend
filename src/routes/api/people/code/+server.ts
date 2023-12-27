import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
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