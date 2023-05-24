import type { Actions } from "./$types.js";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { supabaseClient } from "../../../lib/utilities/supabaseClient.js";
import { page } from "$app/stores";
import { browser } from "$app/environment";

export {}
export const prerender = false;

async function getCourses(event) {
  if(!browser)
  {
    const {data: courseData, error} = await event.locals.sb.from('courses')
      .select('id, inserted_at, course_image_url, course_title,' +
        ' course_prefix, course_number, course_term');
    console.log(courseData)
    return courseData
  }

}

export const load = (event) => ({
  courses: {
    courseData: getCourses(event)
  }

})

export const actions: Actions = {
  joinCourse: async (event) => {
    const {request, cookies, url} = event
    const {supabaseClient} = await getSupabase(event)
    const formData = await request.formData()


    const {data} = await supabaseClient.auth.refreshSession()
    const user = data.user
    const code = formData.get('code')
    if (user != null) {
      const { error, data, status } = await supabaseClient.rpc('enroll_user',
          {_user_id: user.id, code: code})
      console.log(error, data, status)
      return { error, data}
    }
  }
}
