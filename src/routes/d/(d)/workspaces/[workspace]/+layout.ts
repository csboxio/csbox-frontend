import {redirect} from "@sveltejs/kit";

export const load = async ({ fetch, data, request, url, parent }) => {
    const workspace_id = url.searchParams.get('id')
    console.log(workspace_id)

    if (!workspace_id)
    {
        redirect(301, "/d")
    }

    return {
        workspace_id: workspace_id
    }
}