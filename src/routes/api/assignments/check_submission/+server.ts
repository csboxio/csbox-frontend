import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession } }) => {
    const assignmentId = url.searchParams.get('id')
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/');
    }

    const body = {
        p_user_id: session.user.id,
        p_assignment_id: assignmentId
    }
    const { data, error } = await supabase.rpc('check_submission_exists', body)
    if (error) {
        console.log(data, error)
    }
    return json(data)
}