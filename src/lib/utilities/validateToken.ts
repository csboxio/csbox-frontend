import { PRIVATE_CLOUDFLARE_SECRET_KEY } from "$env/static/private";

const SECRET_KEY = PRIVATE_CLOUDFLARE_SECRET_KEY
interface TokenValidateResponse {
  'error-codes': string[];
  success: boolean;
  action: string;
  cdata: string;
}
export async function validateToken(token: string, secret: string) {
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        response: token,
        secret: secret,
      }),
    },
  );

  console.log(response)

  const data: TokenValidateResponse = await response.json();

  return {
    // Return the status
    success: data.success,

    // Return the first error if it exists
    error: data['error-codes']?.length ? data['error-codes'][0] : null,

  };
}
export async function checkToken(token) {
  const { success, error } = await validateToken(token, SECRET_KEY)

  console.log(success)
  if (!success) {
    console.log(error)
    return {
      error: error || 'Invalid CAPTCHA',
    };
  }
  return success
}