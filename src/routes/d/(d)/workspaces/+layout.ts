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

    const ide = await fetch(`/api/workspace/ide?v=1`);
    const active_workspaces = await fetch("/api/workspace/all");
    const health_check = await fetch(`/api/workspace/healthcheck`);
    const jwt_session = await fetch(`/api/workspace/jwt`)

    return {
      ide: await ide.json(),
      active_workspaces: await active_workspaces.json(),
      health_check: health_check.json(),
      jwt_session: jwt_session.json()
    };
  } catch (error) {
    console.log("Workspace error:", error);
    throw redirect(303, '/');
  }
};