import type {Actions} from "./$types";
import {redirect} from '@sveltejs/kit'
import {invalidateAll} from "$app/navigation";

export const prerender = false;

export const actions: Actions = {
    updateRole: async  ({ request, url, params, locals: { supabase } }) => {
        const formData = await request.formData()
        const {data} = await supabase.auth.refreshSession()
        let user;
        if (data == null) {
            const {data} = await supabase.auth.refreshSession()
            user = data.user
        }
        user = data.user

        if (user != null) {

            const {error} = await supabase.rpc('set_claim', {uid: user.id, claim: 'userrole', value: 'instructor'});
            console.log(error)
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

        throw redirect(303, '/d')
    }
}