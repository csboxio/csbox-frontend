import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, setHeaders, url, locals: { getSession, supabase }, event }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/');
    }
        const { data, error } = await supabase.from('courses')
            .select('id, inserted_at, updated_at, course_image_url, course_title, course_prefix, course_number, course_term, course_color, course_contact, course_start, course_end')


        if (error) {
            console.log(error)
        }
        console.log(data, error)

        return json({data})

}