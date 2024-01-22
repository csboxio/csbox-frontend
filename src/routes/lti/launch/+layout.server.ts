export const load = async ({ url, cookies, locals: { getSession } }) => {
    const { searchParams } = new URL(url);

    let ltik = searchParams.get('ltik');
    // Token exists
    if (ltik !== null) {
        cookies.set('ltik', ltik, {
            sameSite: 'none',
            secure: true,
            path: '/',
            maxAge: 60 * 60 // 1 Hour
        });
    }
    else {
        const ltikFromCookie = cookies.get('ltik');

        if (ltikFromCookie !== null) {
            ltik = ltikFromCookie;
        }
    }

    return {
        session: await getSession(),
        ltik: ltik
    }
}