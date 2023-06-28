// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, url, locals: { getSession }, parent }) => {
    const parentData = await parent();

    const session = parentData.session;

    const loadUsers = async () => {
        if (session) {
            const response = await fetch('/api/users', {
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                    UserID: session.user.id
                }
            });

            if (url.searchParams.get('code')) {
                throw redirect(303,  '/')
            }
            return await response.json();
        }
    }

    return { user: loadUsers(), session }
}