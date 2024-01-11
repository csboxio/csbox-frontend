import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, setHeaders, locals: { supabase } }) => {
  const course = url.searchParams.get('course')

  const { data, error } = await supabase
      .rpc('get_modules_assignments_quizzes', { course_id_param: course });

  console.log(data, error)
  setHeaders({
    'cache-control': 'public, max-age=5, s-maxage=5'
  })
  return json(data)
}