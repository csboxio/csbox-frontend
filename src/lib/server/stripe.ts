import Stripe from 'stripe'
import { env } from '$env/dynamic/private'

// export the stripe instance
export const stripe = Stripe(env.SECRET_STRIPE_KEY, {
    // pin the api version
    apiVersion: '2022-11-15'
})