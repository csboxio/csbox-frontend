import type {LayoutServerLoad} from "./$types";
import {browser} from "$app/environment";
import { courseStore, userStore } from "../lib/stores/stores";
import { setContext } from "svelte";
export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: LayoutServerLoad = async (event) => {
  if (event.locals.session && !browser) {
    return {
      session: event.locals.session
    };
  }
}