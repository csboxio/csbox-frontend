import {json, redirect, RequestHandler} from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/');
    }

    const body = await request.json();

    const { course } = body;

    console.log(body)

    const { data, error } = await supabase.rpc('create_lms_course', course);

    console.log(data, error)

    if (error) {
        console.log(data, error)
        return json(false)
    }

    return json(true)
}