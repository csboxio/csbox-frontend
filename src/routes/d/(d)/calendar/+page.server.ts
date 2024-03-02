import type { Actions } from "../$types.js";
import {redirect} from "@sveltejs/kit";

export {}
export const prerender = false;
export const load = async ({ locals: { getSession, getClaim } }) => {
    const session = await getSession()
    if (session) {
        const claim = await getClaim()
        return {
            claim: claim,
        }
    }
}
