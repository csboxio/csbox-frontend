import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ locals: { getSession, supabase } }) => {
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