// Remember to add .env in this dir with secrets.
// stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook
//
// npx supabase start
// npx supabase functions deploy stripe-webhook --project-ref bpjcaiybudgwujfpyevt
// npx supabase functions serve --no-verify-jwt stripe-webhook --env-file .\supabase\functions\stripe-webhook\.env


import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.1.0";
import { createDenoHandler } from "https://esm.sh/stripe-sync@0.1.4/adapters/deno";
import { createSupabaseAdapter } from "https://esm.sh/stripe-sync@0.1.4/databaseAdapters/supabase";
import Stripe from "https://esm.sh/stripe@10.17.0?target=deno&no-check";
import invariant from "https://esm.sh/tiny-invariant@1.3.1";

const stripe = new Stripe(Deno.env.get("PRIVATE_STRIPE_KEY"), {
    httpClient: Stripe.createFetchHttpClient(),
    apiVersion: "2023-10-16",
});
const cryptoProvider = Stripe.createSubtleCryptoProvider();

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
{
    invariant(typeof supabaseUrl === "string", "SUPABASE_URL is required");
    invariant(
        typeof supabaseServiceKey === "string",
        "SUPABASE_SERVICE_ROLE_KEY is required"
    );
}

export const supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
    db: {
        schema: "stripe",
    },
});

const handler = createDenoHandler({
    databaseAdapter: createSupabaseAdapter({
        supabase: supabaseClient,
    }),
    stripe,
    cryptoProvider,
    stripeEndpointSecret: Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET") ?? "",
    stripeSecretKey: Deno.env.get("PRIVATE_STRIPE_KEY") ?? "",
    callbacks: {
        "payment_intent.created": (event) => {
            console.log(event);
        },
    },
});

serve(handler);
