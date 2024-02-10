import {redirect} from "@sveltejs/kit";
import {invalidateAll} from "$app/navigation";

export const load = async ({ fetch, depends, locals: { getSession, getClaim } }) => {
    depends('supabase:auth')

    const session = await getSession()

    return {
        session
    }
}