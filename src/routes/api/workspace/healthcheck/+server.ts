import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
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