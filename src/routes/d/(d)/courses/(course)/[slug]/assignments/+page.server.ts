import type {Actions } from "./$types";
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
    createGroup: async ({ request, url, params, locals: { supabase } }) => {
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
                course_id: course_id,
                group_title: name
            }
            const {error} = await supabase.from('groups').upsert(updates)
            console.log(error)
        }
    },
    addItemToGroup: async ({ request, url, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        let user;
        if (data == null) {
            const {data} = await supabase.auth.refreshSession()
            user = data.user
        }
        user = data.user
        const assignment_id = formData.get('assignment_id')
        const quiz_id = formData.get('quiz_id')


        const group = formData.get('groups')

        const course_id = params.slug
        if (user != null) {
            const updates = {
                in_group: group
            }
            const {error} = await supabase.from('assignments').update(updates)
                .eq('user_id', user.id)
                .eq('course_id', course_id)
                .eq('assignment_id', assignment_id)

            console.log(error)
        }
    },
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
                p_user_id: user.id,
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
                p_in_module: null,
                // TODO ADD GROUP THING TO HERE
                p_available_start: availableStart,
                p_available_end: availableEnd,
                // TODO ADD THE OPTION TO CHANGE IF ITS PUBLISHED OR NOT
                p_published: false
            }

            // Leave out the in_module (module id) if it is blank in the update, if not include it.
            if (module != '') {
                //Object.assign(updates, {p_in_module: module})
            }

            console.log(updates)

            const { data, error } = await supabase.rpc('create_assignment', updates)

            console.log(error, data)

        }
    }
}