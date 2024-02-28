import {redirect} from "@sveltejs/kit";
import {invalidate, invalidateAll} from "$app/navigation";
export const handle = async ({ event, resolve, request, response }) => {
    console.log(`Incoming request: ${JSON.stringify(event)}}`);

    if (event.url.pathname.startsWith('/api')) {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        console.log(session)
        if (!session) {
            console.log('Hooks client, no session');
            throw redirect(303, '/auth');
        }
    }

    const cacheablePaths = ['/images', '/icons', '/fonts'];
    const isCacheable = cacheablePaths.some(path => event.url.pathname.startsWith(path) || event.url.pathname.endsWith('.png') || event.url.pathname.endsWith('.css'));

    if (isCacheable) {
        response.headers['Cache-Control'] = 'public, max-age=86400';
    }
};