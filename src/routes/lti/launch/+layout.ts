// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";
import {browser} from "$app/environment";
import {goto} from "$app/navigation";


//does launch email exist in our users
export const load = async ({ fetch, url, redirect, parent }) => {
    const parentData = await parent();
    const session = parentData.session;

    console.log(session)

    if (session) {
        const { searchParams } = new URL(url);
        const ltik = searchParams.get('ltik');

        const course = searchParams.get('course');
        const assignment = searchParams.get('assignment');

        const launchResponse = await fetch(`/api/lti/launch?ltik=${ltik}`);
        const lmsUserIDResponse = await fetch(`/api/lti/check_lms_user_id_exists?ltik=${ltik}`)

        if (!launchResponse.ok) {
            return {
                error: {
                    status: launchResponse.status,
                    message: "Error fetching launch data",
                },
            };
        }

        const launchData = await launchResponse.json();
        const lms_user_id_exists = await lmsUserIDResponse.json()

        if (launchData && launchData && launchData.launchInfo && launchData.launchInfo.target) {
            const redirectUrl = launchData.launchInfo.target;
            console.log(launchData)
        }

        // TODO ONLY BUILT FOR ASSIGNMENTS
        return {
            course_id: course,
            assignment_id: assignment,
            ltik: ltik,
            launch: launchData,
            lms_user_id_exists: lms_user_id_exists
        };
    }

};
