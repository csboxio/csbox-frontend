import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, url, setHeaders, locals: { supabase, getSession }, event }) => {
  try {
    const session = await getSession()
    if (!session) {
      throw redirect(303, '/');
    }
    const course = url.searchParams.get('course')
    const {data, error} = await supabase.from('quizzes')
        .select('id, quiz_title, quiz_doc, quiz_attempts, question_count, due, points, in_module')
        .eq('course_id', course)


    setHeaders({
      'cache-control': 'public, max-age=60, s-maxage=60'
    })

    return json(data)
  } catch (error) {
    console.log('Error during GET request:', error);
    return json({ error: 'Error occurred.'})
  }
}