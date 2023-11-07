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
      .rpc('get_course_metrics', {_course_id: course});

  console.log(data, error)

  return json(data)
}