import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
export const ssr = false
export const load = (async ({ fetch, data, request, url, parent, params }) => {
    console.log('asd')
    const parentData = await parent();
    const session = parentData.session
    if (!session) {
        throw redirect(303, '/');
    }
    console.log('her')
    const assignment = await fetch(`/api/assignments/assignment_slug`)
    return {
        assignment: await assignment.json(),
        session: session,
        assignmentSlug: params.assignment,
    };

});