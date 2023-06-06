// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore
import { corsHeaders } from '../_shared/cors.ts'

console.log('Hello from Cloudflare Trunstile!')

function ips(req: Request) {
  return req.headers.get('x-forwarded-for')?.split(/\s*,\s*/)
}

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { token } = await req.json()
  const clientIps = ips(req) || ['']
  const ip = clientIps[0]

  // Validate the token by calling the
  // "/siteverify" API endpoint.
  let formData = new FormData()
  formData.append('secret', Deno.env.get('PRIVATE_CLOUDFLARE_SECRET_KEY') ?? '')
  formData.append('response', token)
  formData.append('remoteip', ip)

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
  const result = await fetch(url, {
    body: formData,
    method: 'POST',
  })

  const outcome = await result.json()
  console.log(outcome)
  if (outcome.success) {
    return new Response('success', { headers: corsHeaders })
  }
  return new Response('failure', { headers: corsHeaders })
})