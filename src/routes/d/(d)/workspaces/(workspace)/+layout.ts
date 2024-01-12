import {browser} from "$app/environment";
import { redirect } from "@sveltejs/kit";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export const load = async ({ fetch, data, request, url, parent }) => {
    const parentData = await parent();
    const session = parentData.session;
    const user = parentData.user?.data;

    try {
        const healthCheckPromise = fetch(`/api/workspace/healthcheck`);
        const idePromise = fetch(`/api/workspace/ide?v=1`);
        const activeWorkspacesPromise = fetch("/api/workspace/all");

        const [
            health_check_response,
            ide_response,
            active_workspaces_response,
        ] = await Promise.all([
            healthCheckPromise,
            idePromise,
            activeWorkspacesPromise,
        ]);

        const health_check = await health_check_response.json();
        const ide = await ide_response.json();
        const active_workspaces = await active_workspaces_response.json();

        return {
            user: user,
            ide,
            active_workspaces,
            health_check,
        };
    } catch (error) {
        console.log("Workspace error:", error);
    }
};