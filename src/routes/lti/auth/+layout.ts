export const load = async ({ fetch, parent }) => {

    const parentData = await parent();
    const session = parentData.session;

    if (session) {
        const response = await fetch('/api/users/onboard');

        return {
            onboard: await response.json(),
            session,
        };
    }
}