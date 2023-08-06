import type { Actions } from "./$types.js";
import {redirect} from "@sveltejs/kit";

export {}
export const prerender = false;

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
  joinCourse: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const {data} = await supabase.auth.refreshSession()
    const user = data.user
    const code = formData.get('code')

    console.log(code)
    if (user != null) {
      const { error, data, status } = await supabase.rpc('enroll_user',
          {_user_id: user.id, code: code})
      console.log(error, data, status)
      return { error, data}
    }
  }
}
