import type {RequestHandler} from "@sveltejs/kit";
import {error, json, redirect} from "@sveltejs/kit";
import {PRIVATE_LTI_API_KEY} from "$env/static/private";

export const POST: RequestHandler = async ({request, url, setHeaders, event, locals: {getSession, supabase}}) => {
    const {searchParams} = new URL(url);
    const ltik = searchParams.get('ltik');

    console.log(url)


    if (!ltik) {
        return {
            status: 400,
            body: 'LTIK parameter not found in the URL'
        };
    }

    const API_KEY = PRIVATE_LTI_API_KEY;

    const authenticationHeader = `LTIK-AUTH-V2 ${API_KEY}:${ltik}`;
    console.log(authenticationHeader)
    const headers = {Authorization: authenticationHeader};

    try {
        const idtoken = await fetch('https://lti.csbox.io/api/idtoken', { headers });
        const launchData = await idtoken.json();

        if (launchData.status === 401) {
            setHeaders({'Content-Type': 'application/json'});
            console.log(launchData)
            return {
                status: 500,
                body: 'Deep linking not available.'
            };
        }

        const user_id = launchData.user.id

        const body = await request.json();
        const deepLinkingResponse = await fetch('https://lti.csbox.io/api/deeplinking/form', {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        const form = await deepLinkingResponse.json();
        setHeaders({'Content-Type': 'application/json'});
        return json(
            {
                deepLinkingForm: form,
                user_id: user_id
            });
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            body: 'Error fetching data'
        };
    }
};
