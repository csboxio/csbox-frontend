import type {Actions} from "./$types";
import {redirect} from '@sveltejs/kit'
import { browser } from "$app/environment";


export const prerender = false;
export const actions: Actions = {
  signin: async ({ request, url, locals: { supabase } }) => {
    if (!browser) {
      const formData = await request.formData()
      const captchaToken = formData.get('cf-turnstile-response') as string
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      const { error: loginError, data } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: { captchaToken },
      })
    }

    throw redirect(303, '/')
  }
}