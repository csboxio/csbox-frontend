import {browser} from "$app/environment";
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
  const instances = await fetch(`/api/instances`)
  const ide = await fetch(`/api/instances/ide?v=1`)
  return {
    instances: await instances.json(),
    ide: await ide.json()
  };
};