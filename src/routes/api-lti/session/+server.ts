import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ cookies, request, url, setHeaders, locals: { supabase, getSession }, event }) => {

    const access_token = url.searchParams.get('access_token')
    const refresh_token = url.searchParams.get('refresh_token')

    console.log(access_token, refresh_token)

    const { data, error } = supabase.auth.setSession({
        access_token,
        refresh_token
    })

    console.log(data, error)

    const refreshToken = cookies['sb-refresh-token'];
    const accessToken = cookies['sb-access-token'];

    if (refreshToken && accessToken) {
        // Set the Supabase session for the request
        const { data, error } = await supabase.auth.setSession(
            {
                refresh_token: refreshToken,
                access_token: accessToken,
            }
        );
        console.log(data, error)
    } else {
        console.log("failed")
    }

    return json(data)
}