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

  try {
    const workspaces = await fetch(`/api/workspace`)
    const ide = await fetch(`/api/workspace/ide?v=1`)
    const instances = await fetch("http://ide.csbox.io/api/workspace/all")
    if (!workspaces.ok || !ide.ok || !instances.ok) {
      redirect(303, '/');
      //throw Error(workspaces.statusText + ide.statusText + instances.statusText);
    }
    return {
      workspaces: await workspaces.json(),
      ide: await ide.json(),
      instances: await instances.json()
    };
  }
  catch (error) {
    console.log("Workspace error");
    redirect(303, '/');
  }
};