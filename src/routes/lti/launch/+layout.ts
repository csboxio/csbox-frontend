// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";
import {browser} from "$app/environment";


export const load = async ({ fetch, url}) => {
    const { searchParams } = new URL(url);
    console.log(url)
    const ltik = searchParams.get('ltik');

    const launch = await fetch(`/api/lti/launch?ltik=${ltik}`);

    return {
        launch: await launch.json(),
    };
}
