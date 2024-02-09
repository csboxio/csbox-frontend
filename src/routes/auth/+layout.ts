import {invalidateAll} from "$app/navigation";

export const load = async ({ fetch, url, parent, depends}) => {
    depends('supabase:auth')

    const parentData = await parent();
    const session = parentData.session;

    if (session) {
        const response = await fetch('/api/users/onboard');

        return {
            onboard: await response.json(),
        };
    }

}