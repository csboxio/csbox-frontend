import {redirect} from "@sveltejs/kit";
export const handle = async ({ event, resolve, request, response }) => {
    console.log(`Incoming request: ${JSON.stringify(event)}}`);

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

    if (request.url.endsWith('.css')) {
        response.headers['Cache-Control'] = 'public, max-age=86400';
    }
};