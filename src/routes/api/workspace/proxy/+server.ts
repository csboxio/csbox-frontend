import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import {uuid} from "@supabase/supabase-js/dist/main/lib/helpers.js";

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, params, setHeaders,  url, locals: { supabase, getSession }, event }) => {
    try {
        const targetURL = `https://vscode.dev/`;
        const response = await fetch(targetURL);

        const nonce = uuid();

        const headers = new Headers();
        headers.set('Content-Security-Policy', `default-src 'self'; script-src 'nonce-${nonce}'; frame-src 'self' ${targetURL}`);

        return new Response(response.body, {
            status: response.status,
            headers,
        });
    } catch (error) {
        console.error('Error fetching content:', error);
        return new Response('Error fetching content', {
            status: 500,
            headers: { 'Content-Type': 'text/plain' },
        });
    }

}