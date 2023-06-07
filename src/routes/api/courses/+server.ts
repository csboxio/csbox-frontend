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
    const { data, error } = await supabase.from('courses')
      .select('id, course_image_url, course_title, course_prefix, course_number, course_term')


    return json({data})
}