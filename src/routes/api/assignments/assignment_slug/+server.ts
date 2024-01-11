import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {

    const assignmentId = url.searchParams.get('id')

    const body = {
        p_assignment_id: assignmentId,
    }

    const { data, error } = await supabase.rpc('get_assignment_data', body)


    //console.log(data, error)

    //event.setHeaders({
    //  'cache-control': 'public, max-age=60, s-maxage=60'
    //})

    return json(data)
}