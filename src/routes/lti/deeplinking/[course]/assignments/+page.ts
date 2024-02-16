import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
export const ssr = false
export const load = (async ({ fetch, data, request, url, parent, params, cookies }) => {
    const parentData = await parent();
    const session = parentData.session
    const ltik = parentData.ltik;
    const { searchParams } = new URL(url);

    if (!session) {
        throw redirect(303, '/');
    }

    return {
        ltik: ltik,
        session: session,
    };

});

