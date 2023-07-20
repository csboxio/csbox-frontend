import type {RequestHandler} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/');
  }

  try {
    const active_workspaces = await fetch("http://ide.csbox.io/api/workspace/all", {
      headers: {
        'Cache-Control': 'public, max-age=60',
      },
    });

    if (!active_workspaces.ok) {
      throw new Error(`Request failed with status ${active_workspaces.status}`);
    }

    const responseData = await active_workspaces.json();

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    if (e instanceof TypeError) {
      console.log("Fetch failed for workspaces.");
    } else {
      console.error(e);
    }

    // If an error occurs, return an appropriate error response.
    return new Response(JSON.stringify({ error: 'failed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }


}