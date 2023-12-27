import {redirect} from "@sveltejs/kit";
export const handle = async ({ event, resolve, request }) => {

    if (event.url.pathname.startsWith('/api')) {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        console.log(session)
        if (!session) {
            console.log('Hooks client, no session')
            throw redirect(303, '/auth');
        }
    }
};