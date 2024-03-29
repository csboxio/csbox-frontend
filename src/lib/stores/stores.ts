import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/$types";

export const userStore = writable();
export const courseStore = writable();
export const courseImageStore = writable();
export const courseDocument = writable();

export const notificationStore = writable();

export const navStore = writable();

export const courseNavStore = writable();

export const workspaceNavStore = writable();

export const checkedUserInfo = writable('false');

export const authTitle = writable();