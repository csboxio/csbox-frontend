import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {PRIVATE_ADMIN_MASTER_KEY} from "$env/static/private";
import { createClient } from '@supabase/supabase-js';
import {json, redirect, RequestHandler} from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies, locals: { getSession } }) => {
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
      {
        db: { schema: 'internal' },
        auth: {
          persistSession: false,
        }
      });
  await supabase.auth.refreshSession()

  const session = await getSession();

    const customCookieHeader = request.headers['x-custom-cookie'];
    const token = customCookieHeader.get('protectedAuth');

  console.log("TOKEN" + token)

    if (!token) {
        return new Response(JSON.stringify({ token, message: 'Error missing token!' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {

        const decodedToken = '' //= jwt.verify(token, PRIVATE_ADMIN_MASTER_KEY)

        const userId = decodedToken.id;

        if (userId == session.user.id) {
            return new Response(JSON.stringify({ token, message: 'Authenticated!' }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }
    catch (e) {
        return new Response(JSON.stringify({ token, message: 'Error with authentication!' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify({ token, message: 'Login successful!' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });

}

