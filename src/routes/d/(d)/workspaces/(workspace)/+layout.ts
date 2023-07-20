import {browser} from "$app/environment";
import { redirect } from "@sveltejs/kit";
export const prerender = true;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export const load = async ({ fetch, data, request, url, parent }) => {
  const parentData = await parent();
  const session = parentData.session
  if (!session) {
    throw redirect(303, '/');
  }

  try {
    const workspaces = await fetch(`/api/workspace`, {
      headers: {
        'Cache-Control': 'public, max-age=500',
      },
    })

    const ide = await fetch(`/api/workspace/ide?v=1`, {
      headers: {
        'Cache-Control': 'public, max-age=500',
      },
    })
    const active_workspaces = await fetch("/api/workspace/all", {
      headers: {
        'Cache-Control': 'public, max-age=60',
      },
    });

    if (!active_workspaces.ok) {
      return {
        workspaces: await workspaces.json(),
        ide: await ide.json(),
        active_workspaces: null
      };
    }

    return {
      workspaces: await workspaces.json(),
      ide: await ide.json(),
      active_workspaces: await active_workspaces.json()
    };
  }
  catch (error) {
    console.log("Workspace error");
    redirect(303, '/');
  }
};