import {browser} from "$app/environment";
import { redirect } from "@sveltejs/kit";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export const load = async ({ fetch, data, request, url, parent }) => {
    const fetchAndParse = async (url) => {
        const response = await fetch(url);
        return response.json();
    };

    const user = await fetchAndParse('/api/users');
    const health_check = await fetchAndParse(`/api/workspace/healthcheck`);
    const ide = await fetchAndParse(`/api/workspace/ide?v=1`);
    const active_workspaces = await fetchAndParse("/api/workspace/all");

        return {
            user,
            ide,
            active_workspaces,
            health_check,
        };

};