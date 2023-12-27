import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/');
  }

  const assignment_id = url.searchParams.get('assignment_id')
  const { error, data } = await supabase.rpc('unlink_assignment_from_template', {p_assignment_id: assignment_id})

  return json(data)
}