import {redirect} from "@sveltejs/kit";

export const load = async ({ fetch, params, parent }) => {
    const parentData = await parent();
    const session = parentData.session

    if (!session) {
        throw redirect(303, '/');
    }

    const response =  await fetch(`/api/assignments/?course=${params.course}`)
    console.log(JSON.stringify(response))

    return {

    }
}