import { browser } from "$app/environment";
import {json, redirect} from "@sveltejs/kit";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
export const ssr = false
export const load = (async ({ fetch, data, request, url, parent, params }) => {
  const parentData = await parent();
  const session = parentData.session
  if (!session) {
    throw redirect(303, '/');
  }

    const submission = await fetch(`/api/submission/?id=${params.assignment}`)


    return {
        session: session,
        params: params,
        course_data: parentData.courses,
        submission: parentData.submission,
        submission_data: await submission.json()
    };
});