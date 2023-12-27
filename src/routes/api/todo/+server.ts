import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request, url, setHeaders, locals: { supabase, getSession }, event }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/');
    }
    const course = url.searchParams.get('course')
    console.log(course)
    const { data, error } = await supabase.rpc('get_user_course_info', {p_course_id: course})


    console.log(data, error)



    return json(data)
}