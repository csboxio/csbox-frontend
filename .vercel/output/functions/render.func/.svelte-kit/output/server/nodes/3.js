import * as universal from '../entries/pages/dashboard/_page.ts.js';
import * as server from '../entries/pages/dashboard/_page.server.ts.js';

export const index = 3;
export const component = async () => (await import('../entries/pages/dashboard/_page.svelte.js')).default;
export const file = '_app/immutable/components/pages/dashboard/_page.svelte-8d79f22c.js';
export { universal };
export { server };
export const imports = ["_app/immutable/components/pages/dashboard/_page.svelte-8d79f22c.js","_app/immutable/chunks/index-28f47c29.js","_app/immutable/chunks/stores-554860e7.js","_app/immutable/chunks/singletons-3f3bf73b.js","_app/immutable/chunks/index-2bc87171.js","_app/immutable/chunks/browser-ponyfill-10e9505f.js","_app/immutable/chunks/Navbar-a975f0de.js","_app/immutable/chunks/supabaseClient-70197f8c.js","_app/immutable/chunks/config-89008b4d.js","_app/immutable/chunks/navigation-71f41e52.js","_app/immutable/chunks/index-9df2dffa.js","_app/immutable/modules/pages/dashboard/_page.ts-4ed993c7.js"];
export const stylesheets = ["_app/immutable/assets/index-95b16411.css"];
export const fonts = [];
