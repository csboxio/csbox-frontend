// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";
import {browser} from "$app/environment";
import {goto} from "$app/navigation";


export const load = async ({ fetch, url, redirect }) => {
    const { searchParams } = new URL(url);
    const ltik = searchParams.get('ltik');

    const launchResponse = await fetch(`/api/lti/launch?ltik=${ltik}`);

    if (!launchResponse.ok) {
        return {
            error: {
                status: launchResponse.status,
                message: "Error fetching launch data",
            },
        };
    }

    const launchData = await launchResponse.json();

    console.log(launchData)
    if (launchData && launchData && launchData.launchInfo && launchData.launchInfo.target) {
        const redirectUrl = launchData.launchInfo.target;
        console.log(launchData)

    }

    return {
        launch: launchData,
    };
};
