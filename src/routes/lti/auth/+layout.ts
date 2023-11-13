
export const load = async ({ fetch, url, parent}) => {
    const parentData = await parent();
    const session = parentData.session;

    if (session) {
        return {
            session
        };
    }

}