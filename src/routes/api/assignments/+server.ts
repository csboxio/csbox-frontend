import type { RequestHandler } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, json, redirect } from "@sveltejs/kit";
import { supabaseClient } from "$lib/utilities/supabaseClient";

import { browser } from "$app/environment";



// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET : RequestHandler = async (event) => {

  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    throw redirect(303, '/');
  }
  const course = event.url.searchParams.get('course')
  const {data, error} = await supabaseClient.from('assignments')
    .select('assignment_id, title, category, due, points')
    .eq('course_id', course)

  event.setHeaders({
    'cache-control': 'public, max-age=60, s-maxage=60'
  })

  return json(data)
}