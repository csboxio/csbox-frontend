import type {Actions} from "./$types";
import {redirect} from '@sveltejs/kit'
import { browser } from "$app/environment";

export const prerender = false;

// SSR should be off at the moment.

import type { Actions } from './$types'

export const actions: Actions = {
    login: async (event) => {
        //const origin = request.headers.get('origin')
        console.log('hgere')
        const { request, url, locals: { supabase } } = event
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        console.log(data, error)
        const session = await supabase.auth.refreshSession();
        return {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            session
        }
    }
}