import {json, RequestHandler} from "@sveltejs/kit";
import {PRIVATE_LTI_API_KEY} from "$env/static/private";




export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
    const {searchParams} = new URL(url);
    const ltik = searchParams.get('ltik');

    if (!ltik) {
        console.log('No LTIK parameter')
        return json({
            status: 400,
            body: 'LTIK parameter not found in the URL'
        });
    }

    const API_KEY = PRIVATE_LTI_API_KEY;

    const authenticationHeader = `LTIK-AUTH-V2 ${API_KEY}:${ltik}`;
    const headers = {Authorization: authenticationHeader};
    const response = await fetch('https://lti.csbox.io/api/idtoken', { headers });
    const id_token = await response.json();

    const lms_user_id = id_token.user.id
    console.log(lms_user_id)
    // get lms_user_id from ltik token, so brute force attacks are difficult (impossible, maybe not really)

    const { data, error } = await supabase.rpc('check_lms_user_id_exists', {p_lms_user_id: lms_user_id})

    return json(data)
}