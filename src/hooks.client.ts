import {redirect} from "@sveltejs/kit";
export const handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/api')) {
        const { session } = await event.locals.supabase.auth.getSession()
        console.log(session)
        if (!session) {
            throw redirect(303, '/');
        }
    }
};