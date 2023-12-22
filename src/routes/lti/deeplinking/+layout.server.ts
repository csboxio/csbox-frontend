import {browser} from "$app/environment";

export const load = async ({ locals: { getSession, getClaim, getLMSUserID }, url, cookies, event, fetch }) => {
    const { searchParams } = new URL(url);
    let ltik = searchParams.get('ltik');

    // Token exists
    if (ltik !== null) {
        cookies.set('ltik', ltik, {
            sameSite: 'none',
            secure: true,
            path: '/',
            maxAge: 60 * 15 // 15 minutes
        });
    }
    else {
        const ltikFromCookie = cookies.get('ltik');

        if (ltikFromCookie !== null) {
            ltik = ltikFromCookie;
        }
    }

        const requestBody = {
            contentItems: [{
                type: 'ltiResourceLink',
                url: 'https://lti.csbox.io/lti/launch?resource=123',
                title: 'Resource'
            }]
        }
        const deeplinking = await fetch(`/api/lti/deeplinking?ltik=${ltik}`, {
            method: 'POST',
            body: JSON.stringify(requestBody)
        });

    const courses = async () => {
        const response = await fetch('/api/courses')
        return response.json()
    }

    return {
        courses: courses(),
        deeplinking: await deeplinking.json(),
        session: await getSession(),
        claim: await getClaim(),
        lms_user_id: await getLMSUserID()
    }
}