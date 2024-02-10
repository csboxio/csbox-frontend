import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {

    const {data, error} = await supabase
        .schema('public')
        .from('org')
        .select('org_id, org_name')

    return json(data)
}