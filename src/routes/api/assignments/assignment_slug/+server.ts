import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
    const session = await getSession()
    console.log("test")
    if (!session) {
        throw redirect(303, '/');
    }
    const assignmentId = url.searchParams.get('assignment_id')
    const {data, error} = await supabase.from('assignments_info')
        .select('assignment, description, submission_type, submission_attempts,' +
            ' display_as, available_start, available_end, inserted_at')
        .eq('course_id', assignmentId)
    console.log(data, error)
    //event.setHeaders({
    //  'cache-control': 'public, max-age=60, s-maxage=60'
    //})

    return json(data)
}