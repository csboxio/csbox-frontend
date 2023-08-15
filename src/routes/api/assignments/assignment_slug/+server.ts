import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/');
    }
    const assignmentId = url.searchParams.get('id')
    const {data, error, status} = await supabase.from('assignments_info')
        .select('assignment, description, grade_type, submission_attempts,' +
            ' display_as, available_start, available_end, updated_at, template_id')
        .eq('assignment', assignmentId)
        .single()



    //event.setHeaders({
    //  'cache-control': 'public, max-age=60, s-maxage=60'
    //})

    return json(data)
}