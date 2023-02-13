import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { page } from '$app/stores';

export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {

    return {
      courseNumber: event.params.slug
    };
};