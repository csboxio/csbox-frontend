import {browser} from "$app/environment";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import type { LayoutLoad } from "./$types.js";
export const prerender = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export const load = (async (  event ) => {
    const {session } = await getSupabase(event);
    if (session) {
        console.log('ran')
        const response = await event.fetch('/api/courses')
        console.log(response.json)
        return {
            courses: {
                courseData: await response.json()
                //enrolledData: enrolled
            },
        };
    }
});