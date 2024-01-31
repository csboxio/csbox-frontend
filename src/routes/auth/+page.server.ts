import type {Actions} from "./$types";
import {redirect} from '@sveltejs/kit'
import { browser } from "$app/environment";

export const prerender = false;

// SSR should be off at the moment.
export const ssr = true
export const csr = true
