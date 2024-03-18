import { stripe } from '$lib/server/stripe'
import {redirect} from "@sveltejs/kit";
export const load = async ({ locals: { getSession, getClaim, getLMSUserID } }) => {
    const session = await getSession()

    if (session) {
        const claim = await getClaim()
        return {
            session: session,
            claim: claim
        }
    }
}

export const actions = {
    // default form action
    default: async ({ request, cookies }) => {
        // get the form
        const form = await request.formData()

        // create the customer
        const customer = await stripe.customers.create({
            email: form.get('email'),
            name: form.get('name')
        })

        // set a cookie
        cookies.set('customerId', customer.id)

        // redirect to collect payment
        throw redirect(303, '/checkout/payment')
    }
}