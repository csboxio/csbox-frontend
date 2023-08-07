import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/');
  }
  let data
  try {
    const response = await fetch(`https://ide.csbox.io/api/`, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })

    if (response.ok) {
      return json(true)
    }

  }
  catch (e) {
    console.error("Error", e);
  }
  return json(false)
}