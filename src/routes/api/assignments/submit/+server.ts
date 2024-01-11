import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {


    const body = await request.json();

    const { data, error } = await supabase.rpc('submit_assignment', body)

    if (error) {
        console.log(data, error)
    }


    return json(data)
}