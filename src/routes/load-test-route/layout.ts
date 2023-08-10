import {redirect} from "@sveltejs/kit";

export const load = async ({ fetch, data, depends, locals: { supabase } }) => {
    await supabase.auth.refreshSession()
    console.log("here")
    // TODO ONLY FOR LOAD TESTING WITH ARTIELLRY.IO, DELETE USER AFTER USE
    const email = "loadtest@csbox.io" as string
    const password = "password123" as string

        const {error: loginError, data} = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        console.log(loginError, data)

}