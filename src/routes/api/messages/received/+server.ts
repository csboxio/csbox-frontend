import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request, url, locals: { getSession, supabase }, event }) => {
    const session = await getSession()

    if (session) {
        const { data, error } = await supabase.from('messages')
            .select('id, sender_id, receiver_id, message, sent_at')
            .eq('receiver_id', session.user.id)


        if (error) {
            console.log(error)
        }

        return json({data})
    }

    return
}