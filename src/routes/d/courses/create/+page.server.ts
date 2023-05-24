import type {Actions} from "./$types";
import {getSupabase} from '@supabase/auth-helpers-sveltekit'
import {invalidateAll} from "$app/navigation";

export const prerender = false;
export const actions: Actions = {
    createCourse: async (event) => {
        const {request} = event
        const {supabaseClient} = await getSupabase(event)

        const { data } = await event.locals.sb.auth.refreshSession()
        let user;
        if (data == null) {
          const { data } = await supabaseClient.auth.refreshSession()
          user = data.user
        }
        user = data.user

        const formData = await request.formData()

        const title = formData.get('course_title') as string
        const prefix = formData.get('course_prefix') as string
        const number = formData.get('course_number') as string
        const term = formData.get('course_term') as string
        if (user != null) {
            const course_id = Math.floor(Math.random() * 9999999999);
            const { error } = await supabaseClient.rpc('create_course',
              {_course_id: course_id,
                    _inserted_at: new Date(),
                    _created_by: user.id,
                    _course_title: title,
                    _course_prefix: prefix,
                    _course_number: number,
                    _course_term: term});

            if (!error) {
                return {success: true, course_id: course_id};
            }

        }
    }
}