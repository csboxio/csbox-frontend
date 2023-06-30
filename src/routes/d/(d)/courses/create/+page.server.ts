import type {Actions} from "./$types";
import {invalidateAll} from "$app/navigation";

export const prerender = false;
export const actions: Actions = {
    createCourse: async ({ request, url, locals: { supabase } }) => {
      const {data} = await supabase.auth.refreshSession()
      const user = data.user

      const formData = await request.formData()
      const title = formData.get('course_title') as string
      const prefix = formData.get('course_prefix') as string
      const number = formData.get('course_number') as string
      const term = formData.get('course_term') as string

      if (data.session) {
        const course_id = Math.floor(Math.random() * 9999999999);
        const { data, error } = await supabase.rpc('create_course',
          {_course_id: course_id,
            _inserted_at: new Date(),
            _created_by: user.id,
            _course_title: title,
            _course_prefix: prefix,
            _course_number: number,
            _course_term: term});

        console.log(error, data)

        if (!error) {
            return {success: true, course_id: course_id};
          }
      }
    }
}