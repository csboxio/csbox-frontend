import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, url, locals: { supabase, getSession }, event }) => {
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