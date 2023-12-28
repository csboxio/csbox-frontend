import {browser} from "$app/environment";
import type { LayoutLoad } from "./$types.js";
import { redirect } from "@sveltejs/kit";
export const prerender = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export const load = async ({ fetch, data, request, url, parent }) => {
    const parentData = await parent()
    const user = parentData.user?.data;
    const courses = async () => {
        const response =  await fetch('/api/courses')
        return response.json()
    }
    return {
        user: user,
        courses: courses(),
    };
};