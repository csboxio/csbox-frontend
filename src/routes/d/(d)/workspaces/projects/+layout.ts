import {browser} from "$app/environment";
import { redirect } from "@sveltejs/kit";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore


export const load = async ({ fetch, data, request, url, parent }) => {
    const parentData = await parent();
    const session = parentData.session;

    if (!session) {
        throw redirect(303, '/');
    }

    try {
        const cacheOptions = {
            headers: {
                'Cache-Control': 'public, max-age=500',
            },
        };

        const projects = await fetch(`/api/workspace/projects`);

        return {
            projects: await projects.json(),
        };
    } catch (error) {
        console.log("Workspace error:", error);
        throw redirect(303, '/');
    }
};