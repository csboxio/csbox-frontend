import {json, redirect, RequestHandler} from "@sveltejs/kit";
import {page} from "$app/stores";

export const POST: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/');
    }

    const body = await request.json();

    const { assignment } = body;

    console.log(assignment)

    const { data, error } = await supabase.rpc('create_lms_assignment', assignment)

    console.log(data, error)

    if (error) {
        console.log(data, error)
        return json(false)
    }

    return json(true)
}