import type {Actions} from "@sveltejs/kit";


export const actions: Actions = {
    createProject: async ({request, url, params, locals: {supabase}}) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        let user;
        if (data == null) {
            const {data} = await supabase.auth.refreshSession()
            user = data.user
        }
        user = data.user
        const name = formData.get('project_name')
        if (user != null) {
            const data = {
                user_id: user.id,
                project_name: name
            }
            const {error} = await supabase.from('projects').insert(data)
            console.log(error)
        }
    },
}