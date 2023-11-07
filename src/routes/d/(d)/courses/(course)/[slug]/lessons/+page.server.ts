import type { Actions, PageServerLoadEvent } from "./$types";

export const prerender = false;
export const ssr = false
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
