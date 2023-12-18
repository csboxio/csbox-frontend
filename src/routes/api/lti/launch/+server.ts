import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import {PRIVATE_LTI_API_KEY} from "$env/static/private";


export const GET: RequestHandler = async ({ request, url, setHeaders, event, locals: { getSession, supabase } }) => {
    const { searchParams } = new URL(url);
    const ltik = searchParams.get('ltik');
    let response;

    const session = await getSession()

    console.log(session)

    if (!ltik) {
        return {
            status: 400,
            body: 'LTIK parameter not found in the URL'
        };
    }

    const API_KEY = PRIVATE_LTI_API_KEY;

    const authenticationHeader = `LTIK-AUTH-V2 ${API_KEY}:${ltik}`;
    const headers = { Authorization: authenticationHeader };

    try {
        response = await fetch('https://lti.csbox.io/api/idtoken', { headers });
        const data = await response.json();

        // You can store the retrieved data in a store or pass it to the component depending on your use case.
        const userInfo = data.user;
        const lmsInfo = data.platform;
        const launchInfo = data.launch;
        const servicesInfo = data.services;

        const platformID = data.platform.id
        const userID = data.user.id
        const email = data.user.email

        // Set the headers and return the data as JSON
        setHeaders({ 'Content-Type': 'application/json' });
        return json({ userInfo, lmsInfo, launchInfo, servicesInfo });
    } catch (error) {
        return {
            status: 500,
            body: 'Error fetching data'
        };
    }
};
