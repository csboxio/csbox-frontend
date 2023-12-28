import {browser} from "$app/environment";
import { redirect } from "@sveltejs/kit";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore


export const load = async ({ fetch, data, request, url, parent }) => {
    const parentData = await parent();
    const session = parentData.session;
    const user = parentData.user;

    try {
        const cacheOptions = {
            headers: {
                'Cache-Control': 'public, max-age=500',
            },
        };

        const templates = await fetch(`/api/workspace/templates`);

        return {
            templates: await templates.json(),
            user: user,
        };
    } catch (error) {
        console.log("Workspace error:", error);
        throw redirect(303, '/');
    }
};