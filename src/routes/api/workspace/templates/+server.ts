import type {RequestHandler} from "@sveltejs/kit";
import {json, redirect} from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, '/');
  }

  try {
    const {data, error } = await supabase.from('templates')
        .select('id, inserted_at, user_id, template_name, updated_at')
        .eq('user_id', session.user.id)

    return json(data);
  } catch (e) {
    return new Response(JSON.stringify({ message: 'API down!' }), {
      status: 302,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};