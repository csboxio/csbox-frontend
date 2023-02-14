import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { error, redirect } from "@sveltejs/kit";
import { supabaseClient } from "$lib/utilities/supabaseClient";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/$types";

export const userStore = writable();
export const courseStore = writable();
