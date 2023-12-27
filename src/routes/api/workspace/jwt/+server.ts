import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';
import {PRIVATE_SUPABASE_JWT} from "$env/static/private";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ locals: { supabase, getSession }, event }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/');
  }

  const token = jwt.sign({ session }, PRIVATE_SUPABASE_JWT)



  return json(token)
}