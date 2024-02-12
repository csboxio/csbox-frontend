import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const orgId = url.searchParams.get('org_id')
    const accessCode = url.searchParams.get('code')

    if (session) {
        const body = {
            org_id: orgId,
            access_code: accessCode,
            user_id: session.user.id
        }

        const { data, error } = await supabase.rpc('join_org', body)

        console.log(error)

        return json(data)
    }
}

