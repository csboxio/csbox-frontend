import type {Actions} from "./$types";
import {redirect} from '@sveltejs/kit'
import {invalidateAll} from "$app/navigation";

export const prerender = false;

export const actions: Actions = {

    updateRole: async  ({ request, url, params, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const session = await getSession();

        const org_id = formData.get('org_id');
        const access_code = formData.get('access_code');
        const role = formData.get('role').toLowerCase();
        const valid = formData.get('access_code_valid');

        if (session) {
            // TODO not secure
            const claim_response = await supabase.rpc('set_claim', {uid: session.user.id, claim: 'userrole', value: role});

            if (claim_response.error) {
                console.log('claim_error ' + claim_response.error);
            }

            // Check if access code is valid
            if (valid) {
                // Join org
                const join_response = await supabase.rpc('join_org', {org_id: org_id, access_code: access_code, user_id: session.user.id});
                // Error
                if (join_response.error) {
                    console.log('join_error ' + JSON.stringify(join_response));
                }
            }

        }
    },

    updateProfile: async ({ request, url, fetch, locals: { supabase } }) => {
        const formData = await request.formData()

        const {data} = await supabase.auth.refreshSession()
        const {session, user} = data

        if (!session || !user) {
            throw redirect(303, '/')
        }
        const fullName = formData.get('first')
        const lastName = formData.get('last_name')
        const website = formData.get('website')
        const bio = formData.get('bio')
        const country = formData.get('country')

        const updates = {
            id: user.id,
            first_name: fullName,
            last_name: lastName,
            website: website,
            bio: bio,
            country: country,
            updated_at: new Date(),
            completed_setup: true
        }

        const headers = new Headers()
        headers.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(updates)
        }

        const response = await fetch('/api/users/update', requestOptions)

        //const {error} = await supabase.from('users').upsert(updates)
        if (response.ok)
            throw redirect(303, '/d')
    }
}