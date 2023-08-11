import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession, getClaim }, event }) => {
  const session = await getSession()
  const claim = await getClaim()
  if (!session) {
    throw redirect(303, '/');
  }
  const course = url.searchParams.get('course')

  const {data, error } = await supabase.from('modules')
      .select('module_title, id, published, assignments ( assignment_id, title, category, in_module, due, points )')
      .order('created_at', {ascending: true})
      .eq('course_id', course)

  console.log(error)
  //event.setHeaders({
  //  'cache-control': 'public, max-age=60, s-maxage=60'
  //})
  return json(data)
}