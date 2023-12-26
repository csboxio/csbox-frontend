// src/routes/+layout.ts
export const load = async ({ fetch, url}) => {
    const { searchParams } = new URL(url);
    console.log(url)
    const ltik = searchParams.get('ltik');

    const launch = await fetch(`/api/lti/launch?ltik=${ltik}`);

    return {
        launch: await launch.json(),
    };
}
