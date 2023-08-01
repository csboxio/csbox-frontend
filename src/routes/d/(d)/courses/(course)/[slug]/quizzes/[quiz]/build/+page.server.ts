import {redirect} from "@sveltejs/kit";

export const load = async ({ locals: { getSession, getClaim } }) => {
    const session = await getSession()
    if (session) {
        const claim = await getClaim()
        if (claim == 'student') {
            redirect(301, '/d')
        }
        return {
            claim: claim,
        }
    }
}