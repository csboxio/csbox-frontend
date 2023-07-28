import {browser} from "$app/environment";
import type { LayoutLoad } from "./$types.js";
import { redirect } from "@sveltejs/kit";
export const prerender = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export const load = async ({ fetch, data, request, url, parent }) => {
  const parentData = await parent();
  const session = parentData.session
  if (!session) {
    throw redirect(303, '/');
  }

  const response = await fetch('/api/messages/received');

  return {
    messages: await response.json(),
    session
  };

};