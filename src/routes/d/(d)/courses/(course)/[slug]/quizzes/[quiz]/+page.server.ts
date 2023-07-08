import type { Actions, PageServerLoadEvent } from "./$types";

export const prerender = false;
export const ssr = false
// @ts-ignore

export const actions: Actions = {
    updateQuiz: async ({ request, url, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        let user;
        if (data == null) {
            const {data} = await supabase.auth.refreshSession()
            user = data.user
        }
        user = data.user
        const title = formData.get('title')
        const attempts = formData.get('attempts')
        const question_count = formData.get('question_count')
        const due = formData.get('due')
        const points = formData.get('points')

        const updates = {
            quiz_title: title,
            quiz_attempts: attempts,
            due: due,
        }

        const course_id = params.slug
        const quiz_id = params.quiz
        if (user != null) {
            const {error} = await supabase.from('quizzes').update(updates)
                .eq('course_id', course_id)
                .eq('id', quiz_id)

            console.log(error)
        }
    }
}