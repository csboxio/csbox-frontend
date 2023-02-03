import { c as create_ssr_component, b as subscribe, e as escape } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.error.message)}</h1>
<hr>
<h1>Looks like the spaghetti code broke... </h1>
<hr>
<h2>Try the following</h2>
<h2>Sign out and sign back in.</h2>
<h2>Clear browser cache &amp; cookies.</h2>`;
});
export {
  Error as default
};
