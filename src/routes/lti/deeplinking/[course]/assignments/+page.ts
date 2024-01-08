import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
export const ssr = false
export const load = (async ({ fetch, data, request, url, parent, params }) => {
    const parentData = await parent();
    const session = parentData.session

    if (!session) {
        throw redirect(303, '/');
    }
    const assignments = async () => {
        const response =  await fetch(`/api/assignments/?course=${params.course}`)
        return response.json()
    }

    return {
        assignments: assignments(),
        session: session,
    };

});

