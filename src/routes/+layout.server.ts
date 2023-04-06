import type {LayoutServerLoad} from "./$types";
import {browser} from "$app/environment";
import {userStore} from "../lib/stores/stores";
import { setContext } from "svelte";

export const prerender = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: LayoutServerLoad = async (event) => {
    if (event.locals.session && !browser) {
        let user;
        const userSubscribe = userStore.subscribe(value => {
            user = value
        });

        if (!user) {
            const {data: tableData} = await event.locals.sb.from('users')
                .select('updated_at, username, first_name, last_name, website, country, avatar_url')
                .eq('id', event.locals.session.user.id)
                .single()

            //setContext(event.locals.session.user.id, userStore);

            // TODO THIS IS A PROBLEM STATE IS SHARED
            userStore.set(tableData)
        }

        return {
            session: event.locals.session,
            user: {
                userData: user,
            },
        };
    }
}