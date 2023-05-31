import type { Actions } from "./$types.js";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";

export {}
export const prerender = false;
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
      //console.log(error, data, status)
      return { error, data}
    }
  }
}
