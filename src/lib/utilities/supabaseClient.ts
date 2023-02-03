import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';
import { writable } from "svelte/store";
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

export const supabaseClient = createClient(env.PUBLIC_SUPABASE_URL!, env.PUBLIC_SUPABASE_ANON_KEY!);

