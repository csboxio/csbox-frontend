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
export async function GET({ url } : RequestEvent) {

console.log(url.searchParams.get('course'))
  // Get path url from database
  // TODO server side user check this is insecure

  const {data, error} = await supabaseClient.from('assignments')
    .select('assignment_id, title, category, due, points')
    .eq('course_id', url.searchParams.get('course'))


  console.log("api" + error)

  const responseInit : ResponseInit =
    {
      headers :
        {
          'cache-control' : 'public, max-age=3600'
        }
    }

  return new Response(data,responseInit);

}