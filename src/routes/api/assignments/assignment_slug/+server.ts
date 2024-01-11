import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
    const assignmentId = url.searchParams.get('id')
    const body = {
        p_assignment_id: assignmentId,
    }

    const { data, error } = await supabase.rpc('get_assignment_data', body)

    return json(data)
}