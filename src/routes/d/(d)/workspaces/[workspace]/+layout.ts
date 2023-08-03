import {redirect} from "@sveltejs/kit";

export const load = async ({ fetch, data, request, url, parent, params }) => {
    return {
        workspace_id: params.workspace
    }
}