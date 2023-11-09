// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";
import {browser} from "$app/environment";
import {createSupabaseLoadClient} from "@supabase/auth-helpers-sveltekit";

import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";


export const load = async ({ fetch, url, parent, locals: { supabase }}) => {
    const { searchParams } = new URL(url);
    console.log(url)
    const ltik = searchParams.get('ltik');

    const parentData = await parent();
    const session = parentData.session;


    console.log(session)
    if (session) {
        const requestBody = {
            contentItems: [{
                type: 'ltiResourceLink',
                url: 'https://lti.csbox.io/lti/launch?resource=123',
                title: 'Resource'
            }]
        }

       /* const deeplinking = await fetch(`/api/lti/deeplinking?ltik=${ltik}`, {
            method: 'POST',
            body: JSON.stringify(requestBody)
        });*/

        return {
            //deeplinking: await deeplinking.json(),
            session,
            supabase
        };
    }
}
