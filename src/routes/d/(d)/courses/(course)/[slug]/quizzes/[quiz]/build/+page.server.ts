import type { Actions, PageServerLoadEvent } from "./$types";

export const prerender = false;
export const ssr = false
// @ts-ignore

export const actions: Actions = {
    addItemToModule: async ({ request, url, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        let user;
        if (data == null) {
            const {data} = await supabase.auth.refreshSession()
            user = data.user
        }
        user = data.user
        const id = formData.get('id')
        const module = formData.get('modules')

        const course_id = params.slug
        if (user != null) {
            const updates = {
                in_module: module
            }
            const {error} = await supabase.from('assignments').update(updates)
                .eq('creator_id', user.id)
                .eq('course_id', course_id)
                .eq('assignment_id', id)

            console.log(error)
        }
    }
}