import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request, url, setHeaders, locals: { supabase, getSession }, event }) => {
  try {
    const course = url.searchParams.get('course')
    const {data, error} = await supabase.from('quizzes')
        .select('id, quiz_title, quiz_doc, quiz_attempts, question_count, due, points, in_module')
        .eq('course_id', course)

    console.log(error)

    return json(data)
  } catch (error) {
    console.log('Error during GET request:', error);
    return json({ error: 'Error occurred.'})
  }
}