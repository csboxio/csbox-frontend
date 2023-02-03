import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export const file = '_app/immutable/components/pages/_layout.svelte-aef982fd.js';
export { server };
export const imports = ["_app/immutable/components/pages/_layout.svelte-aef982fd.js","_app/immutable/chunks/index-28f47c29.js","_app/immutable/chunks/supabaseClient-70197f8c.js","_app/immutable/chunks/index-2bc87171.js","_app/immutable/chunks/browser-ponyfill-10e9505f.js","_app/immutable/chunks/config-89008b4d.js","_app/immutable/chunks/singletons-3f3bf73b.js","_app/immutable/chunks/navigation-71f41e52.js"];
export const stylesheets = ["_app/immutable/assets/_layout-99dda395.css"];
export const fonts = [];
