// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";
import {browser} from "$app/environment";


export const load = async ({ fetch, url, parent}) => {
    const parentData = await parent();
    const session = parentData.session;


    //console.log(session)
    if (session) {
        const user = await fetch('/api/users');
        const dashboard = await fetch('/api/dashboard/instructor/get')

        console.log(user)
        return {
            user: await user.json(),
            dashboard: await dashboard.json(),
            session
        };
    }

}