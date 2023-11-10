
export const load = async ({ fetch, url, parent}) => {
    const parentData = await parent();
    const session = parentData.session;
    console.log(session)

    if (session) {
       // const response = await fetch('/api/users/onboard');

        return {
            //onboard: await response.json(),
            session
        };
    }

}