import type {Actions } from "./$types";
import { redirect } from "@sveltejs/kit";


export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const actions: Actions = {
    createAssignment: async ({ request, url, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        const {session, user} = data
        if (!session) {
            throw redirect(303, '/');
        }
        const name = formData.get('name')
        const description = formData.get('description')
        const points = formData.get('points')
        let category = formData.get('category')
        const display_as = formData.get('displayas')
        const grade_type = formData.get('submissiontype')
        const assign_to = formData.get('assignto')
        const due = formData.get('due');
        const availableStart = formData.get('availfrom')
        const availableEnd = formData.get('availto')
        const module = formData.get('modules')
        const course_id = params.slug

        // if category is selected make it blank
        // TODO make this impossible to leave blank in the first place
        if (category == "Select category") {
            category = "";
        }
        const _assignment_id = Math.floor(Math.random() * 9999999999)
        if (user != null) {
            console.log(module)

            let updates = {
                p_assignment_id: _assignment_id,
                p_creator_id: user.id,
                p_course_id: course_id,
                p_points: points,
                p_display_as: display_as,
                p_due: due,
                p_title: name,
                p_category: category,
                p_description: description,
                // TODO this needed to be changed to p_grade_type
                p_submission_type: grade_type,
                p_submission_attempts: null,
                p_available_start: availableStart,
                p_available_end: availableEnd
            }

            // Leave out the in_module (module id) if it is blank in the update, if not include it.
            if (module != '') {
                //Object.assign(updates, {p_in_module: module})
            }

            const { data, error } = await supabase.rpc('create_assignment', updates)

            console.log(error, data)

        }
    }
}