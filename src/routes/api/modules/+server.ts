import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession, getClaim }, event }) => {
  const session = await getSession()
  const claim = await getClaim()
  if (!session) {
    throw redirect(303, '/');
  }
  const course = url.searchParams.get('course')

  const { data, error } = await supabase
      .rpc('get_modules_assignments_quizzes', { course_id_param: course });

  console.log(data)

  console.log(error)
  //event.setHeaders({
  //  'cache-control': 'public, max-age=60, s-maxage=60'
  //})
  return json(data)
}