import { c as create_ssr_component, b as subscribe, v as validate_component, e as escape } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
import { A as Auth, a as Account } from "../../chunks/Auth.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${!$page.data.session ? `${validate_component(Auth, "Auth").$$render($$result, {}, {}, {})}` : `<h1>Welcome ${escape($page.data.session.user.email)}</h1>
    <p>Edit account</p>

    ${validate_component(Account, "Account").$$render($$result, { session: $page.data.session }, {}, {})}`}`;
});
export {
  Page as default
};
