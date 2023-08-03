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

    const submissions = await fetch(`/api/submissions/?c_id=${params.slug}&a_id=${params.assignment}`)

    return {
        session: session,
        params: params,
        submissions: await submissions.json(),
        course_data: parentData.courses
    };
});