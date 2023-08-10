import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {PRIVATE_ADMIN_MASTER_KEY} from "$env/static/private";
import { createClient } from '@supabase/supabase-js';
import {json, redirect, RequestHandler} from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, url, locals: { getSession, supabase } }) => {
  const email = url.searchParams.get('email')
  const password = url.searchParams.get('password')

  await supabase.auth.refreshSession()

  //const session = await getSession();

  const {error: loginError, data} = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  console.log(loginError, data)

  return new Response(JSON.stringify({ message: 'Success' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

