import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get('code')
  const token = url.searchParams.get('token')
  if (code) {
    const {data, error} = await supabase.auth.exchangeCodeForSession(code)
    console.log(error, data)
  }

  throw redirect(303, '/')
}