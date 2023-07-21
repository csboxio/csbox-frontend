// src/routes/+layout.server.ts
import {redirect} from "@sveltejs/kit";

export const load = async ({ locals: { getSession } }) => {
    const session = getSession()
    if (!session) {
        throw redirect(303, '/');
    }
    return {
        session: session,
    }
}