import {json, redirect, RequestHandler} from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
    const body = await request.json();
    const { lms_course_id, lms_user_id, course_id } = body;

    const { data, error } = await supabase
        .from('courses')
        .update({lms_course_id: lms_course_id, lms_user_id: lms_user_id})
        .eq('id', course_id)

    if (error) {
        console.log(data, error)
        return json(false)
    }

    return json(true)
}