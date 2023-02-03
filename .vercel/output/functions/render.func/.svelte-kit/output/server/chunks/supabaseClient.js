import { createClient } from "@supabase/auth-helpers-sveltekit";
import { p as public_env } from "./shared.js";
const supabaseClient = createClient(public_env.PUBLIC_SUPABASE_URL, public_env.PUBLIC_SUPABASE_ANON_KEY);
export {
  supabaseClient as s
};
