
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
    link_lms_id: async ({ request, url, locals: { supabase, getLMSUserID, getClaim, getSession } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        const {session, user} = data

        if (!session || !user) {
            throw redirect(303, '/')
        }

        const claim = await getClaim()

        const lms_user_id = formData.get('lms_user_id') as string


        if (session) {
            const {error, data} = await supabase.rpc('set_lms_id', {p_user_id: user.id, p_lms_user_id: lms_user_id})
            console.log(error, data)
        }
    }
} satisfies Actions;
