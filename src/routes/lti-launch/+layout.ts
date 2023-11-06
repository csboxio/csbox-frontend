// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";
import {browser} from "$app/environment";


export const load = async ({ fetch, url}) => {
    const { searchParams } = new URL(url);
    const ltik = searchParams.get('ltik');

    const launch = await fetch(`/api/lti/launch?ltik=${ltik}`);
    console.log(JSON.stringify(launch))
    return {
        launch: await launch.json(),
    };
}
