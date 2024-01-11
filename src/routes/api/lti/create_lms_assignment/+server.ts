import {json, redirect, RequestHandler} from "@sveltejs/kit";
import {page} from "$app/stores";

export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
    const body = await request.json();
    const { assignment } = body;
    const { data, error } = await supabase.rpc('create_lms_assignment', assignment)

    console.log(data, error)

    if (error) {
        console.log(data, error)
        return json(false)
    }

    return json(true)
}