
import type {Actions, PageServerLoadEvent} from "./$types";
import { invalidateAll } from "$app/navigation";
import { redirect } from "@sveltejs/kit";


export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const load = async ({ locals: { getSession, getClaim } }) => {
    const session = await getSession()
    if (session) {
        const claim = await getClaim()
        return {
            claim: claim,
        }
    }
}

export const actions: Actions = {
    submitAssignment: async ({ request, url, fetch, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        const {session, user} = data
        if (!session) {
            throw redirect(303, '/');
        }
        const user_id = session.user.id;
        const course_id = params.slug;
        const assignment_id = params.assignment;
        const submission_type = 'url';
        const _url = formData.get('url');
        const project_id = formData.get('project_id')

        const requestBody = {
            'p_user_id': user_id,
            'p_course_id': course_id,
            'p_assignment_id': assignment_id,
            'p_submission_type': submission_type,
            'p_url': _url,
            'p_project_id': project_id,
        }

        console.log(requestBody)


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        };

        const response = await fetch('/api/assignments/submit', requestOptions)
        console.log(response.json())
    },
}