import type {RequestHandler} from "@sveltejs/kit";
import {json, redirect} from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
  const session = await getSession();

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

    return json(responseData);
  } catch (e) {
    console.error('Error occurred:', e);
    return json({ error: 'Error occurred.' });
  }
};