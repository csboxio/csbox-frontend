import {json, redirect, RequestHandler} from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
    const body = await request.json();
    const { course } = body;
    const { data, error } = await supabase.rpc('create_lms_course', course);
    if (error) {
        console.log(data, error)
        return json(false)
    }
    // TODO this seems weird.
    return json(true)
}