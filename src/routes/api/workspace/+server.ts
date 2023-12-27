import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request, url, setHeaders, locals: { supabase, getSession }, event }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/');
  }
  const {data } = await supabase.from('instances')
    .select('id, inserted_at, instance_config, instance_title, instance_state')
    .eq('creator_id', session.user.id)

  return json(data)
}