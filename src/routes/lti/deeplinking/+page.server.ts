
import {Actions, redirect} from "@sveltejs/kit";

export const load = async ({ locals: { getSession, getClaim, getLMSUserID } }) => {
    const session = await getSession()
    if (session) {
        const claim = await getClaim()
        const lms_user_id = await getLMSUserID()
        return {
            claim: claim,
            lms_user_id: lms_user_id
        }
    }
}

export const actions: Actions = {
    link_lms_id: async ({ request, url, locals: { supabase, getLMSUserID, getClaim } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        const {session, user} = data

        const claim = await getClaim()
        const lms_user_id = await getLMSUserID()

        console.log(claim)
        console.log(lms_user_id)
    }
} satisfies Actions;
