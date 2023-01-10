import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import {getSupabase} from "@supabase/auth-helpers-sveltekit";
import type {LayoutServerLoad} from "../../../../.svelte-kit/types/src/routes/$types";
import {browser} from "$app/environment";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: LayoutServerLoad = async (event) => {
    const { session, supabaseClient } = await getSupabase(event);
    if (session) {
        const { data: tableData } = await supabaseClient.from('courses').select('*');
        console.log(tableData);
    }
}