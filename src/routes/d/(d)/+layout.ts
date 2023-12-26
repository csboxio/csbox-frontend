// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";
import {browser} from "$app/environment";


export const load = async ({ fetch, parent } ) => {
    const parentData = await parent();
    const session = parentData.session;

    if (session) {
        const user = await fetch('/api/users');
        const dashboard = await fetch('/api/dashboard/instructor/get')

        return {
            user: await user.json(),
            dashboard: await dashboard.json(),
            session
        };
    }

}