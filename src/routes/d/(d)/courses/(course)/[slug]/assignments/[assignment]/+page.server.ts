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
    updateAssignment: async ({ request, url, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        const {session, user} = data
        if (!session) {
            throw redirect(303, '/');
        }
        const title = formData.get('title')
        const points = formData.get('points')
        const due = formData.get('due');
        const category = formData.get('category')
        const available_start = formData.get('available_start')
        const available_end = formData.get('available_end')

        const description = formData.get('description')
        const display_as = formData.get('display_as')
        const submission_attempts = formData.get('submission_attempts')
        const grade_type = formData.get('grade_type')

        //const module = formData.get('modules')
        //const assign_to = formData.get('assignto')

        const course_id = params.slug

        if (user != null) {
            const assignments_update = {
                assignment_id: params.assignment,
                user_id: user.id,
                course_id: course_id,
                points: points,
                display_as: display_as,
                due: due,
                title: title,
                category: category,
            }

            const assignment_info_update = {
                assignment: params.assignment,
                description: description,
                grade_type: grade_type,
                submission_attempts: submission_attempts,
                available_start: available_start,
                available_end: available_end
            }


            console.log(assignments_update)

            console.log(assignment_info_update)

            const {error: error} = await supabase.from('assignments')
                .update(assignments_update)
                .eq('assignment_id', params.assignment)
            console.log(error)

            const {error: error_info} = await supabase.from('assignments_info')
                .update(assignment_info_update)
                .eq('assignment', params.assignment)
            console.log(error_info)


        }
    },
    createTemplate: async ({ request, url, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        let user;
        if (data == null) {
            const {data} = await supabase.auth.refreshSession()
            user = data.user
        }
        user = data.user
        const name = formData.get('name')
        const course_id = params.slug
        if (user != null) {
            const updates = {
                user_id: user.id,
                template_name: name
            }
            const {error} = await supabase.from('templates').insert(updates)
            console.log(error)
        }
    },
}