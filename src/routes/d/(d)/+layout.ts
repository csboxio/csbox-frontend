// src/routes/+layout.ts

export const ssr = false;
export const load = async ({ fetch, parent, setHeaders } ) => {
    const parentData = await parent();
    const session = parentData.session;

    setHeaders({
        "cache-control": "max-age=60",
    });

    if (session) {
        const user = await fetch('/api/users');

        return {
            user: await user.json(),
            session
        };
    }

}