import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals: { supabase } }) => {

  const { data, error } = await supabase.rpc('refresh_courses_metrics');

  console.log(data, error)

  return json(data)
}