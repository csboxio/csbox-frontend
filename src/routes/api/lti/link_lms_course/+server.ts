import {json, redirect, RequestHandler} from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/');
    }

    const body = await request.json();

    const { lms_course_id, course_id } = body;

    console.log(lms_course_id, course_id)

    const { data, error } = await supabase
        .from('courses')
        .update({lms_course_id: lms_course_id})
        .eq('id', course_id)

    if (error) {
        console.log(data, error)
        return json(false)
    }

    return json(true)
}