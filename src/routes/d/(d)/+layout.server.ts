import type { LayoutServerLoad, LayoutServerParentData } from "../$types";
import {browser} from "$app/environment";
import { fetchUsers } from "$lib/utilities/utils"
import type { ServerLoadEvent } from "@sveltejs/kit";

export const prerender = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const load: LayoutServerParentData = async (event) => {


}