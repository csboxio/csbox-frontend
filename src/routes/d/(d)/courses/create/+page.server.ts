import type {Actions} from "./$types";

export const prerender = false;



async function createModule () {

    /*const course_id = params.slug
    if (user != null) {
        const updates = {
            user_id: user.id,
            course_id: course_id,
            module_title: name
        }
        const {error} = await supabase.from('modules').upsert(updates)
        console.log(error)
    }*/
}
export const actions: Actions = {
    createCourse: async ({ request, url, locals: { supabase, getSession } }) => {
        const session = await getSession()

        const formData = await request.formData()
        const title = formData.get('course_title') as string
        const prefix = formData.get('course_prefix') as string
        const number = formData.get('course_number') as string
        const term = formData.get('course_term') as string
        const color = formData.get('course_color') as string
        const contact = formData.get('course_contact') as string
        const image = formData.get('course_image_url') as string

        if (session) {
            console.log("create/page" + session.user)
            const updates = {
                _inserted_at: new Date(),
                _user_id: session.user.id,
                _course_image_url: image,
                _course_title: title,
                _course_prefix: prefix,
                _course_number: number,
                _course_term: term,
                _course_start: null,
                _course_end: null,
                _course_type: null,
                _course_color: color,
                _course_contact: contact,
            }
            console.log(updates)
            const { data, error } = await supabase.rpc('create_course', updates);
            console.log(data,error)

            if (error) {
                console.log(error)
            }
        if (!error) {
            return {success: true, id: data};
          }
      }
    }
}