// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";
import {browser} from "$app/environment";


export const load = async ({ fetch, url}) => {
    const { searchParams } = new URL(url);
    console.log(url)
    const ltik = searchParams.get('ltik');

    const data = await fetch(`/api/lti/memberships?ltik=${ltik}`);

    return {
        members: await data.json(),
    };
}
