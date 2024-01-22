import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/');
  }
  const submission_id = url.searchParams.get('s_id')
  const grade_percentage = url.searchParams.get('g_p')
  const points = url.searchParams.get('p')

  console.log(submission_id, grade_percentage, points)
  const { data, error } = await supabase.rpc('update_grade', { submission_id_arg: submission_id, new_grade_percent: grade_percentage, new_points: points})

  if (error) {
    console.log(data, error)
  }

  //event.setHeaders({
  //  'cache-control': 'public, max-age=60, s-maxage=60'
  //})

  return json(data)
}