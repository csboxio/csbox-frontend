import type { Actions, PageServerLoadEvent } from "./$types";

export const prerender = false;
export const ssr = false
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
    createModule: async ({ request, url, params, locals: { supabase } }) => {
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
                module_title: name
            }
            const {error} = await supabase.from('modules').upsert(updates)
            console.log(error)
        }
    },

    addItemToModule: async ({ request, url, params, locals: { supabase } }) => {
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


        const module = formData.get('modules')

        const course_id = params.slug
        if (user != null && quiz_id == null) {
            const updates = {
                in_module: module
            }
            const {error} = await supabase.from('assignments').update(updates)
              .eq('user_id', user.id)
              .eq('course_id', course_id)
              .eq('assignment_id', assignment_id)

            console.log(error)
        }

        if (user != null && assignment_id == null) {
            const updates = {
                in_module: module
            }
            const {error} = await supabase.from('quizzes').update(updates)
                .eq('user_id', user.id)
                .eq('course_id', course_id)
                .eq('id', quiz_id)

            console.log(error)
        }
    }
}