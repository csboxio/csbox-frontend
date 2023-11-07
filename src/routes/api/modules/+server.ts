import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, url, setHeaders, locals: { supabase, getSession, getClaim }, event }) => {
  const session = await getSession()
  const claim = await getClaim()
  if (!session) {
    throw redirect(303, '/');
  }
  const course = url.searchParams.get('course')

  const { data, error } = await supabase
      .rpc('get_modules_assignments_quizzes', { course_id_param: course });


  console.log(data, error)
  setHeaders({
    'cache-control': 'public, max-age=5, s-maxage=5'
  })
  return json(data)
}