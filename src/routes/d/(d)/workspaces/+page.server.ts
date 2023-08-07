import type {Actions, PageServerLoadEvent} from "./$types";
import {redirect} from "@sveltejs/kit";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const actions: Actions = {

    createWorkspace: async ({ request, url, fetch, locals: { supabase } }) => {
        console.log('sdfsdfsdf')
        const formData = await request.formData()

        const {data} = await supabase.auth.refreshSession()
        const {session, user} = data

        if (!session || !user) {
            throw redirect(303, '/')
        }
        const workspace_name = formData.get('workspace_name')
        const type = formData.get('type')
        const user_id = user.id
        const image = formData.get('image')

        console.log(user_id, image)

        const payload = {
            user_id: user_id,
            workspace_name: workspace_name,
            session: session,
            //type: "basic", // TODO not implemented
            image: image,
            language: 'python'
        }

        try {
            const response = await fetch('https://ide.csbox.io/api/workspace/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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