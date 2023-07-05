// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";
import {browser} from "$app/environment";

export const load = async ({ fetch, url, parent }) => {

    const parentData = await parent();
    const session = parentData.session;

    if (session) {
        const response = await fetch('/api/users');

        return {
            user: await response.json(),
            session
        };
    }

}