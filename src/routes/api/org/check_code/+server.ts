import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
    const orgId = url.searchParams.get('org_id')
    const accessCode = url.searchParams.get('code')

    const body = {
        org_id: orgId,
        access_code: accessCode
    }

    const { data, error } = await supabase.rpc('check_access_code', body)

    console.log(error)

    return json(data)
}