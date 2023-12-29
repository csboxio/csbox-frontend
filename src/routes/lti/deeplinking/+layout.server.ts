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

    const session = await getSession()

    let responseData;
    try {
        responseData = await deeplinking.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        responseData = null;
    }

    return {
        deeplinking: responseData,
        session: session,
        claim: await getClaim(),
        lms_user_id: await getLMSUserID()
    }
}