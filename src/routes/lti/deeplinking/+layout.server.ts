import {browser} from "$app/environment";
import {redirect} from "@sveltejs/kit";

export const load = async ({ locals: { getSession, getClaim, getLMSUserID }, url, cookies, event, fetch }) => {
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


    const session = await getSession()

    const launch = await fetch(`/api/lti/launch?ltik=${ltik}`);

    if (launch.ok) {
        return {
            launch: await launch.json(),
            ltik: ltik,
            session: session,
            claim: await getClaim(),
            lms_user_id: await getLMSUserID()
        }
    }
}