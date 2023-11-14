// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";
import {browser} from "$app/environment";

import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import type {Database} from "../../../schema.js";
import {createClient} from "@supabase/supabase-js";


export const load = async ({ fetch, url, parent, data}) => {
    const { searchParams } = new URL(url);
    console.log(url)
    const ltik = searchParams.get('ltik');

    const parentData = await parent();

    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
        {
            auth: {
                persistSession: false,
            },
        });


    const {
        data: { session },
    } = await supabase.auth.refreshSession()

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

    }
    return {
        //deeplinking: await deeplinking.json(),
        session
    };
}
