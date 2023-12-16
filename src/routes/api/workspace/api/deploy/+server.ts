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
  const id = url.searchParams.get('id')

  try {
    const response = await fetch(`https://ide.csbox.io/api/kube/deploy/${id}`)
    let data
    if (response.ok) {
      data = response.json()
      console.log(data)
      //TODO get the body redirect
    }

  }
  catch (e) {
    console.error("Error");
  }

  return new Response('Success');

}