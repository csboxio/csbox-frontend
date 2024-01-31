// src/routes/+layout.ts
import type {LayoutLoad} from "./$types.js";
import {AuthService} from "../lib/auth/services/auth.js";

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const authService = new AuthService(fetch, data);
  const { supabase } = await authService.init();

  return { supabase }
}