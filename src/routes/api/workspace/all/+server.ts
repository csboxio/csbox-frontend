import type {RequestHandler} from "@sveltejs/kit";
import {json, redirect} from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request, setHeaders, url, locals: { supabase, getSession }, event }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, '/');
  }

    const {data, error } = await supabase.from('workspaces')
        .select('id, user_id, workspace_name, image_type, type, workspace_state, inserted_at')
        .eq('user_id', session.user.id)

  console.log(error)

    return json(data);
}