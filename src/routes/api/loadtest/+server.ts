import { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const email = url.searchParams.get('email')
  const password = url.searchParams.get('password')

  await supabase.auth.refreshSession()

  if (email == 'loadtest@csbox.io') {
    const {error: loginError, data} = await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  return new Response(JSON.stringify({ message: 'Success' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

