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
    editAssignment: async ({ request, url, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        const {session, user} = data
        if (!session) {
            throw redirect(303, '/');
        }
        const name = formData.get('name')
        const points = formData.get('points')
        const display_as = formData.get('displayas')
        const submissionType = formData.get('submissiontype')
        //const assign_to = formData.get('assignto')
        const due = formData.get('due');
        const availableStart = formData.get('startDate')
        const availableEnd = formData.get('endDate')
        const module = formData.get('modules')
        const published = formData.get('published')
        const course_id = params.slug
        const group_id = formData.get('groups')

        // if category is selected make it blank

        const _assignment_id = formData.get('assignment_id')
        if (user != null) {
            console.log(module)

            const updates = {
                p_assignment_id: _assignment_id,
                p_user_id: user.id,
                p_course_id: course_id,
                p_points: points,
                p_display_as: display_as,
                p_due: due ? due : null,
                p_title: name,
                p_submission_type: submissionType,
                p_submission_attempts: null,
                p_in_module: null,
                p_available_start: availableStart ? availableStart : null,
                p_available_end: availableEnd ? availableEnd : null,
                p_published: published,
                // group
                p_in_group: group_id ? group_id : null
            }

            console.log(updates)

            const { data, error } = await supabase.rpc('update_assignment', updates)

            console.log(error, data)

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
            //const updates = {
            //    user_id: user.id,
           //     template_name: name,
            //    assignment_id: params.assignment
          //  }
            const { error } = await supabase.rpc('create_template_and_update_assignment',
                { p_user_id: user.id,
                       p_template_name: name,
                       p_assignment_id: params.assignment
                     })
            console.log(error)
        }
    },

    linkTemplate: async ({ request, url, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        let user;
        if (data == null) {
            const {data} = await supabase.auth.refreshSession()
            user = data.user
        }
        user = data.user
        const template_id = formData.get('template_id')
        if (user != null) {
            //const updates = {
            //    user_id: user.id,
            //     template_name: name,
            //    assignment_id: params.assignment
            //  }
            const { error } = await supabase.from('assignments_info')
                .update({template_id: template_id})
                .eq('assignment', params.assignment)

            console.log(error)
        }
    },
}