import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {PRIVATE_ADMIN_MASTER_KEY} from "$env/static/private";
import { createClient } from '@supabase/supabase-js';
import {json, redirect, RequestHandler} from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals: { getSession } }) => {

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
      {
        db: { schema: 'internal' },
        auth: {
          persistSession: false,
        }
      });
  await supabase.auth.refreshSession()

  const session = await getSession();


  /*if (!session) {
    return new Response(JSON.stringify({ message: 'No session' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }*/

  const body = await request.formData()

  const password = body.get('password')

    const { data: masterPassword, error } = await supabase
        .from('auth')
        .select('master_password')
        .eq('master_key', PRIVATE_ADMIN_MASTER_KEY)
        .single();

    //console.log(masterPassword, error)

    if (error || !masterPassword || !masterPassword.master_password) {
      return new Response(JSON.stringify({ message: 'Error fetching password' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (password === masterPassword.master_password) {
      const payload = {
        id: session.user.id,
      };

      // Generate the token using jwt.sign

      const token = '' //jwt.sign(payload, PRIVATE_ADMIN_MASTER_KEY, { expiresIn: '1h' });


      const { data, error: insertError } = await supabase.from('tokens').insert([
        { id: session.user.id, token: token },
      ]);

      //console.log(data, error)

      if (insertError) {
        return new Response(JSON.stringify({ token, message: 'Error storing token!' }), {
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
    } else {
      return new Response(JSON.stringify({ message: 'Incorrect password' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
}

