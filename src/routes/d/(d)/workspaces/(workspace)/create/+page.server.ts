import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
  createInstance: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const {data} = await supabase.auth.refreshSession()

    let user = data.user
    const type = formData.get('type')
    const assignment = formData.get('assignment')
    const title = formData.get('title')
    if (user != null) {
      let updates = {
        creator_id: user.id,
        inserted_at: new Date(),
        instance_config: null,
        instance_title: title,
      }
      const {error} = await supabase.from('instances').upsert(updates)
    }
  }
}