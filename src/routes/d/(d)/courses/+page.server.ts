import type { Actions } from "./$types.js";

export {}
export const prerender = false;
export const actions: Actions = {
  joinCourse: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()

    const {data} = await supabase.auth.refreshSession()
    const user = data.user
    const code = formData.get('code')
    if (user != null) {
      const { error, data, status } = await supabase.rpc('enroll_user',
          {_user_id: user.id, _enroll_code: code})
      console.log(error, data, status)
      return { error, data}
    }
  }
}
