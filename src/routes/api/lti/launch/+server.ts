import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import {PRIVATE_LTI_API_KEY} from "$env/static/private";


export const GET: RequestHandler = async ({ request, url, setHeaders, event, locals: { getSession, supabase } }) => {
    const { searchParams } = new URL(url);
    const ltik = searchParams.get('ltik');
    let launch;

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
        launch = await fetch('https://lti.csbox.io/api/idtoken', { headers });
        const launch_data = await launch.json();

        // You can store the retrieved data in a store or pass it to the component depending on your use case.
        const userInfo = launch_data.user;
        const lmsInfo = launch_data.platform;
        const launchInfo = launch_data.launch;
        const servicesInfo = launch_data.services;

        const platformID = launch_data.platform.id
        const userID = launch_data.user.id
        const email = launch_data.user.email


        // ------ Supabase Auth
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                shouldCreateUser: true,
                emailRedirectTo: 'https://joint-dear-lamb.ngrok-free.app/lti-launch/confirmed',
            },
        })
        console.log(data, error)
        // ------


        // Set the headers and return the data as JSON
        setHeaders({ 'Content-Type': 'application/json' });
        return json({ launch, userInfo, lmsInfo, launchInfo, servicesInfo });
    } catch (error) {
        return {
            status: 500,
            body: 'Error fetching data'
        };
    }
};
