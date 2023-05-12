import type { Actions } from "./$types.js";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { supabaseClient } from "../../../lib/utilities/supabaseClient.js";
import { page } from "$app/stores";

export {}
export const prerender = false;

export const actions: Actions = {
  joinCourse: async (event) => {

    const {request, cookies, url} = event
    const {supabaseClient} = await getSupabase(event)
    const formData = await request.formData()

    const {data} = await event.locals.sb.auth.refreshSession()
    let user;
    if (data == null) {
      const {data} = await supabaseClient.auth.refreshSession()
      user = data.user
    }

    user = data.user

    const code = formData.get('code')
    if (user != null) {
      const { error, data, status } = await supabaseClient.rpc('enroll_user',
        {user_id: user.id, enroll_code: code})
      console.log(error, data, status)
      if (status === 200) {
        console.log("200")
      }
    }
  }
}
