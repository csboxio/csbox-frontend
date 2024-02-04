import {browser} from "$app/environment";

export const load = async ({ context, locals: { supabase } }) => {

    if (browser) {
        if (context.url.pathname !== '/auth') {
            await supabase.auth.signOut()
        }
    }

}

