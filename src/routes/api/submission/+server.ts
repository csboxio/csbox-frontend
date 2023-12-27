import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request, url, params, locals: { supabase, getSession }, event }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/');
    }

    const assignmentId = url.searchParams.get('id')


    const body = {
        p_user_id: session.user.id,
        p_assignment_id: assignmentId
    }


    const { data, error } = await supabase.rpc('get_submission_info', body)

    if (error) {
        console.log(data, error)
    }



    return json(data)
}