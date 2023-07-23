import {browser} from "$app/environment";
import { redirect } from "@sveltejs/kit";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export const load = async ({ fetch, data, request, url, parent }) => {
  const parentData = await parent();
  const session = parentData.session;

  if (!session) {
    throw redirect(303, '/');
  }

  try {
    const cacheOptions = {
      headers: {
        'Cache-Control': 'public, max-age=500',
      },
    };

    const workspaces = await fetch(`/api/workspace`, cacheOptions);
    const ide = await fetch(`/api/workspace/ide?v=1`, cacheOptions);
    const active_workspaces = await fetch("/api/workspace/all", {
      headers: {
        'Cache-Control': 'public, max-age=60',
      },
    });

    if (!active_workspaces.ok) {
      return {
        workspaces: await workspaces.json(),
        ide: await ide.json(),
        active_workspaces: null,
      };
    }

    return {
      workspaces: await workspaces.json(),
      ide: await ide.json(),
      active_workspaces: await active_workspaces.json(),
    };
  } catch (error) {
    console.log("Workspace error:", error);
    throw redirect(303, '/');
  }
};