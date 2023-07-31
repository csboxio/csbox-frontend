import type {Actions} from "@sveltejs/kit";


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
    deleteCourse: async ({request, url, params, locals: {supabase}}) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        let user;
        if (data == null) {
            const {data} = await supabase.auth.refreshSession()
            user = data.user
        }
        user = data.user
        const _course_id = formData.get('course_number_delete')
        const course_id = params.slug
        if (user != null && course_id === _course_id) {
            const {error} = await supabase.from('courses')
                .delete()
                .eq('id', params.slug)
                .eq('user_id', user.id)
            console.log(error)
        }
    },
}