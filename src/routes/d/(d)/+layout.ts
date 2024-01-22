// src/routes/+layout.ts

export const load = async ({ fetch, parent } ) => {
    const parentData = await parent();
    const session = parentData.session;

    if (session) {
        const user = await fetch('/api/users');

        return {
            user: await user.json(),
            session
        };
    }

}