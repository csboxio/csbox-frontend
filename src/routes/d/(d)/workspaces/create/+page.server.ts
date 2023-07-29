import type { Actions } from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";

export const actions: Actions = {
  /*createInstance: async ({ request, url, locals: { supabase } }) => {
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
  }*/

  createWorkspace: async ({ request, url, fetch, locals: { supabase } }) => {
    const formData = await request.formData()

    const {data} = await supabase.auth.refreshSession()
    const {session, user} = data

    if (!session || !user) {
      throw redirect(303, '/')
    }
    const workspace_name = formData.get('workspace_name')
    const type = formData.get('type')
    const user_id = user.id
    const language = formData.get('language') // TODO not implemented

    const payload = {
      user_id: user_id,
      workspace_name: workspace_name,
      //type: "basic", // TODO not implemented
      //image_name: 'docker.io/lt1gt0/theia-base', // TODO not implemented
      //image_version: 'latest', // TODO not implemented
      //language: language  // TODO not implemented
    }

    console.log(payload)

    try {
      const response = await fetch('https://ide.csbox.io/api/workspace/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log(response)

      if (response.ok) {
        console.log("Success creating workspace")
      }
      else {
        console.error("Error creating workspace")
      }
    } catch (error) {
      console.log("Error creating workspace: " + error )
    }
  }
}