import {browser} from "$app/environment";
import {redirect} from "@sveltejs/kit";

export const load = async ({ locals: { getSession, getClaim, getLMSUserID }, url, parent, cookies, event, fetch }) => {
    const parentData = await parent();
    const launch = parentData.launch;
    const { searchParams } = new URL(url);
    const session = await getSession()

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


    const courses = async () => {
        const response = await fetch('/api/courses')
        return response.json()
    }

    return {
        courses: await courses(),
        launch: launch,
        session: await getSession(),
        claim: await getClaim(),
        lms_user_id: await getLMSUserID()
    }
}