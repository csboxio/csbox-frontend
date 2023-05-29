import type { RequestHandler } from "@sveltejs/kit";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, json, redirect } from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async (event) => {
    const { session, supabaseClient } = await getSupabase(event)
    if (!session) {
        throw redirect(303, '/');
    }
    const { data, error } = await supabaseClient.from('courses')
      .select('id, course_image_url, course_title, course_prefix, course_number, course_term')
      .eq('created_by', session.user?.id);

    event.setHeaders({
        'cache-control': 'public, max-age=60, s-maxage=60'
    })

    return json(data)
}