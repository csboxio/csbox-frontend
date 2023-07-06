import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/');
    }
    const quiz_id = url.searchParams.get('quiz_id')

    //console.log(data, error)
    //event.setHeaders({
    //  'cache-control': 'public, max-age=60, s-maxage=60'
    //})

    return
}