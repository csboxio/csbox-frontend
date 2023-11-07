import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const POST: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/');
    }

    const body = await request.json();

    const { data, error } = await supabase.rpc('submit_assignment', body)

    if (error) {
        console.log(data, error)
    }


    return json(data)
}