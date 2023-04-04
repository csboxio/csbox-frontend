import type { Actions, PageServerLoadEvent } from "./$types";
import {getSupabase} from '@supabase/auth-helpers-sveltekit'

export const prerender = false;
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
    const {session, supabaseClient} = await getSupabase(event);
    if (session) {

        const {data: modules, error} = await supabaseClient.from('modules')
            .select('module_title, id')
            .eq('user_id', session.user.id)
            .eq('course_id', event.params.slug)

        const {data: assignmentData} = await supabaseClient.from('assignments')
        .select('id, inserted_at, assignment_title, category, description, in_module(*)')
        .eq('course_id', event.params.slug)

        console.log(assignmentData)


        return {
            modules,
            assignmentData
        };
    }
};

export const actions: Actions = {
    createModule: async (event) => {

        const {request, cookies, url} = event
        const {supabaseClient} = await getSupabase(event)
        const formData = await request.formData()

        const {data} = await event.locals.sb.auth.refreshSession()
        let user;

        if (data == null) {
            const {data} = await supabaseClient.auth.refreshSession()
            user = data.user
        }
        user = data.user
        const name = formData.get('name')
        const course_id = event.params.slug
        if (user != null) {
            const updates = {
                user_id: user.id,
                course_id: course_id,
                module_title: name
            }
            const {error} = await event.locals.sb.from('modules').upsert(updates)
            console.log(error)
        }
    }
}