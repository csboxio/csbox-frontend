import type {Actions} from "./$types";
import {getSupabase} from '@supabase/auth-helpers-sveltekit'
import {invalidateAll} from "$app/navigation";

export const prerender = false;
export const actions: Actions = {
    createCourse: async (event) => {
        const {request} = event
        const {supabaseClient} = await getSupabase(event)

        const {data} = await supabaseClient.auth.refreshSession()
        const {session, user} = data

        const formData = await request.formData()

        const title = formData.get('course_title') as string
        const prefix = formData.get('course_prefix') as string
        const number = formData.get('course_number') as string
        const term = formData.get('course_term') as string
        if (user != null) {
            const updates = {
                id: Math.floor(Math.random() * 9999999999),
                inserted_at: new Date(),
                created_by: user.id,
                course_title: title,
                course_prefix: prefix,
                course_number: number,
                course_term: term,
            }
            const {error} = await supabaseClient.from('courses').insert(updates)
            if (!error) {
                return {success: true, course_id: updates.id};
            }
        }
    }
}