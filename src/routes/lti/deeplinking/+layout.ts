// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";
import {browser} from "$app/environment";


export const load = async ({ fetch, url}) => {
    const { searchParams } = new URL(url);
    console.log(url)
    const ltik = searchParams.get('ltik');

    const requestBody = {
        contentItems: [{
            type: 'ltiResourceLink',
            url: 'https://lti.csbox.io/lti/launch?resource=123',
            title: 'Resource'
        }]
    }

    const deeplinking = await fetch(`/api/lti/deeplinking?ltik=${ltik}`, {
        method: 'POST',
        body: JSON.stringify(requestBody)
    });

    return {
        deeplinking: await deeplinking.json(),
    };
}
