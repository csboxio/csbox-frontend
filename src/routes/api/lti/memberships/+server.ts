import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import {PRIVATE_LTI_API_KEY} from "$env/static/private";


export const GET: RequestHandler = async ({ request, url, setHeaders, event, locals: { getSession, supabase } }) => {
    const { searchParams } = new URL(url);
    const ltik = searchParams.get('ltik');
    let response;

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
        response = await fetch('https://lti.csbox.io/api/memberships', { headers });
        const data = await response.json();


        console.log(data)
        setHeaders({ 'Content-Type': 'application/json' });
        return json({ data });
    } catch (error) {
        return {
            status: 500,
            body: 'Error fetching data'
        };
    }
};
