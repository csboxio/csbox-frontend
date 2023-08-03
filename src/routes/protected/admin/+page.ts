/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, url, parent, cookies }) => {
    console.log(cookies)
    const response = await fetch('/api/protected/admin', {
        headers: {
            'X-Custom-Cookie': cookies.get('protectedAuth'),
        },
    });
    const data = await response.json();
    console.log(data)

    return {
        isAuthenticated: true
    }
}

