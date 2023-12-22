// src/routes/+layout.ts

import { redirect } from "@sveltejs/kit";
import {browser} from "$app/environment";

import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import type {Database} from "../../../schema.js";
import {createClient} from "@supabase/supabase-js";
import {storedLTIK} from "../stores.js";
import {subscribe} from "svelte/internal";

export const load = async ({ fetch, url, parent, data, cookies, event }) => {

}
