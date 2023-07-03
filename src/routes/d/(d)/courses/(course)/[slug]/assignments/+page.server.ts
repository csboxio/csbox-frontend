import type {Actions, PageServerLoadEvent} from "./$types";
import { invalidateAll } from "$app/navigation";
import { redirect } from "@sveltejs/kit";


export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const actions: Actions = {
    createAssignment: async ({ request, url, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        const {session, user} = data
        console.log(user)
        if (!session) {
            throw redirect(303, '/');
        }
        const name = formData.get('name')
        const description = formData.get('description')
        const points = formData.get('points')
        let category = formData.get('category')
        const display_as = formData.get('displayas')
        const submission_type = formData.get('submissiontype')
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
        let updates = {
            assignment_id: _assignment_id,
            title: name,
            creator_id: user.id,
            course_id: course_id,
            category: category,
            points: points,
            display_as: display_as,
            due: due,
        }


        const info_updates = {
            assignment: _assignment_id,
            inserted_at: new Date(),
            description: description,
            submission_type: submission_type,
            submission_attempts: submission_type,
            available_start: availableStart,
            available_end: availableEnd
        }

        // Leave out the in_module (module id) if it is blank in the update, if not include it.
        if (module != '') {
            updates = Object.assign(updates, {in_module: module})
        }
            //console.log(updates)
            const {error: error} = await supabase.from('assignments').upsert(updates)
            console.log(error)
            const {error: error_info} = await supabase.from('assignments_info').upsert(info_updates)
            console.log(error_info)
        }
    }
}