import type {Actions, PageServerLoadEvent} from "./$types";
import {getSupabase} from '@supabase/auth-helpers-sveltekit'

export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
    const {session, supabaseClient} = await getSupabase(event);
    const slug = event.params.slug
    if (session) {
        const {data: courseData} = await supabaseClient.from('courses')
            .select('course_image_url, course_title, course_prefix, course_number, course_term')
            .eq('created_by', session.user.id)
            .eq('id', event.params.slug)
            .single();

        const {data: assignmentData} = await supabaseClient.from('assignments')
            .select('id, inserted_at, assignment_title, category, description')
            .eq('course_id', event.params.slug)

        return {
            courseData,
            assignmentData,
            slug
        };
    }
};

export const actions: Actions = {
    createAssignment: async (event) => {
        const {request, cookies, url} = event
        const {supabaseClient} = await getSupabase(event)
        const formData = await request.formData()

        const {data} = await event.locals.sb.auth.refreshSession()
        let user;
        console.log(data)
        if (data == null) {
            const {data} = await supabaseClient.auth.refreshSession()
            user = data.user
        }

        user = data.user

        const name = formData.get('name')
        const description = formData.get('description')
        const points = formData.get('points')
        let category = formData.get('category')
        const display_as = formData.get('displayas')
        const submission_type = formData.get('submissiontype')
        const assign_to = formData.get('assignto')
        const due = due
        const course_id = event.params.slug

        // if category is selected make it blank
        // TODO make this impossible to leave blank in the first place
        if (category == "Select category") {
            category = "";
        }
        if (user != null) {
        const updates = {
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
            submission_type: submission_type
        }
            const {error} = await event.locals.sb.from('assignments').upsert(updates)
            console.log(error)
        }
    }
}