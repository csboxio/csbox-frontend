import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import {getSupabase} from "@supabase/auth-helpers-sveltekit";
import type {LayoutServerLoad} from "../../../../.svelte-kit/types/src/routes/$types";
import {browser} from "$app/environment";
