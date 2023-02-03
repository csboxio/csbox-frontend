import { f as fail, r as redirect } from "../../../chunks/index.js";
import { AuthApiError } from "@supabase/supabase-js";
const actions = {
  signup: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const { error: err } = await locals.sb.auth.signUp({
      email: body.email,
      password: body.password
    });
    if (err) {
      if (err instanceof AuthApiError && err.status == 400) {
        return fail(400, {
          error: "Invalid email or password"
        });
      }
      return fail(500, {
        error: "Server error. Please try again later."
      });
    }
    throw redirect(303, "/");
  }
};
export {
  actions
};
