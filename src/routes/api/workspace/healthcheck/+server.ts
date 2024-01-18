import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ setHeaders, request, url, locals: { supabase, getSession }, event }) => {
  let data
  try {
    const response = await fetch(`https://ide.csbox.io/api/ping`, {
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

  setHeaders({
    "cache-control": "public, max-age=120, s-maxage=120"
  });
  return json(false)
}