
import type {Actions, PageServerLoadEvent} from "./$types";
import { invalidateAll } from "$app/navigation";
import { redirect } from "@sveltejs/kit";


export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const actions: Actions = {
    updateGrade: async ({ request, url, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        let user;
        if (data == null) {
            const {data} = await supabase.auth.refreshSession()
            user = data.user
        }
        user = data.user
        const submission_id = formData.get('submission_id')
        const grade_percentage = formData.get('grade_percentage')
        const points = formData.get('points')

        if (user != null) {
            const { data, error } = await supabase.rpc('update_grade', { submission_id_arg: submission_id, new_grade_percent: grade_percentage, new_points: points})
            console.log(error)
        }
    },
}