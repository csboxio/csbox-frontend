import {redirect} from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export const load = (async ({ fetch, data, request, url, parent, params }) => {
    const parentData = await parent();
    const session = parentData.session

    if (!session) {
        throw redirect(303, '/');
    }

    const assignment = await fetch(`/api/assignments/assignment_slug/?id=${params.assignment}`)
    const submission = await fetch(`/api/assignments/check_submission/?id=${params.assignment}`)

    return {
        assignment: await assignment.json(),
        submitted: await submission.json(),
        assignment_slug: params.assignment
    };
});