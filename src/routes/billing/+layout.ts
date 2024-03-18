export const load = async ({ fetch, parent, setHeaders } ) => {
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