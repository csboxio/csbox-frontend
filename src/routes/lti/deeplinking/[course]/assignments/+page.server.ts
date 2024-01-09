import {browser} from "$app/environment";
import {redirect} from "@sveltejs/kit";

export const load = async ({ locals: { getSession, getClaim, getLMSUserID }, url, parent, cookies, event, fetch }) => {
    const parentData = await parent();
    const launch = parentData.launch;
    const { searchParams } = new URL(url);
    const session = await getSession()


    return {
        launch: launch,
        session: await getSession(),
        claim: await getClaim(),
        lms_user_id: await getLMSUserID()
    }
}