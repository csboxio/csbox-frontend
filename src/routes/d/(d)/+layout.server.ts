import type { LayoutServerLoad, LayoutServerParentData } from "../$types";
import {browser} from "$app/environment";
import { fetchUsers } from "$lib/utilities/utils"
import type { ServerLoadEvent } from "@sveltejs/kit";

export const prerender = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const load: LayoutServerParentData = async (event) => {
  if (event.locals.session && !browser) {
    const {data: tableData} = await event.locals.sb.from('users')
      .select('updated_at, username, first_name, last_name, website, country, avatar_url')
      .eq('id', event.locals.session.user.id)
      .single()



    return {
      session: event.locals.session,
      user: {
        userData: tableData,
      },
    };
  }
}