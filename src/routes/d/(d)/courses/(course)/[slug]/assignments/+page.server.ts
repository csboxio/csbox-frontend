import type {Actions, PageServerLoadEvent} from "./$types";
import {getSupabase} from '@supabase/auth-helpers-sveltekit'
import { invalidateAll } from "$app/navigation";


export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
    const {session, supabaseClient} = await getSupabase(event);
    const slug = event.params.slug
    if (session) {

    }
};

export const actions: Actions = {
    createAssignment: async (event) => {

        const {request, cookies, url} = event
        const {supabaseClient} = await getSupabase(event)
        const formData = await request.formData()

        const {data} = await event.locals.sb.auth.refreshSession()
        let user;
        //console.log(data)
        if (data.user == null) {
            //const {data} = await supabaseClient.auth.refreshSession()
            //user = data.user
        }

        user = data.user

        const name = formData.get('name')
        const description = formData.get('description')
        const points = formData.get('points')
        let category = formData.get('category')
        const display_as = formData.get('displayas')
        const submission_type = formData.get('submissiontype')
        const assign_to = formData.get('assignto')
        const due = formData.get('due');
        const availableFrom = formData.get('availfrom')
        const availableUntil = formData.get('availto')
        const module = formData.get('modules')
        const course_id = event.params.slug

        // if category is selected make it blank
        // TODO make this impossible to leave blank in the first place
        if (category == "Select category") {
            category = "";
        }


        if (user != null) {
        let updates = {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignores
            id: Math.floor(Math.random() * 9999999999),
            assignment_title: name,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            user_id: user.id,
            inserted_at: new Date(),
            course_id: course_id,
            category: category,
            description: description,
            points: points,
            display_as: display_as,
            submission_type: submission_type,
            submission_attempts: submission_type,
            due: due,
            available_from: availableFrom,
            available_until: availableUntil
        }
        // Leave out the in_module (module id) if it is blank in the update, if not include it.
        if (module != '') {
            updates = Object.assign(updates, {in_module: module})
        }
        //console.log(updates)
            const {error} = await event.locals.sb.from('assignments').upsert(updates)
            //console.log(error)
        }
    }
}