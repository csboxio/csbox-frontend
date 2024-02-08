import {browser} from "$app/environment";
import { redirect } from "@sveltejs/kit";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export const load = async ({ fetch, data, request, url, parent }) => {
    const fetchAndParse = async (url) => {
        const response = await fetch(url);
        return response.json();
    };

    const health_check = await fetchAndParse(`/api/workspace/healthcheck`);

        return {
            health_check
        };

};