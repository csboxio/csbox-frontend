import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';
import { writable } from "svelte/store";
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const supabaseClient = createClient(PUBLIC_SUPABASE_URL!, PUBLIC_SUPABASE_ANON_KEY!,
  {
  realtime: {
    params: {
      eventsPerSecond: 5
    }
  }});

