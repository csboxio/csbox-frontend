
import type {Actions, PageServerLoadEvent} from "./$types";
import { invalidateAll } from "$app/navigation";
import { redirect } from "@sveltejs/kit";


export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const load = async ({ locals: { getSession, getClaim } }) => {
    const session = await getSession()
    if (session) {
        const claim = await getClaim()
        return {
            claim: claim,
        }
    }
}

export const actions: Actions = {
    submitAssignment: async ({ request, url, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        let user;
        if (data == null) {
            const {data} = await supabase.auth.refreshSession()
            user = data.user
        }
        user = data.user
        if (user != null) {

            console.log("submitAssignment")
        }
    },
}