import type {Actions} from "./$types";
import {redirect} from '@sveltejs/kit'

export const prerender = false;
export const actions: Actions = {
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
            updated_at: new Date()
        }

        const headers = new Headers()
        headers.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(updates)
        }

        fetch('/api/users/update', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })

        //const {error} = await supabase.from('users').upsert(updates)

        throw redirect(303, '/d')
    }
}