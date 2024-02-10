export const load = async ({ fetch, url, parent, depends}) => {
    const parentData = await parent();
    const session = parentData.session;

    if (session) {
        const response = await fetch('/api/org');

        return {
            org: await response.json(),
        };
    }

}