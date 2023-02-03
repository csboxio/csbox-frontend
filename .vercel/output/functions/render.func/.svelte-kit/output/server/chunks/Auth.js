import { c as create_ssr_component, v as validate_component, d as add_attribute, e as escape } from "./index2.js";
import "./supabaseClient.js";
import { A as Avatar } from "./Avatar.js";
const Account = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { session } = $$props;
  let fullName;
  let website;
  let avatarUrl;
  if ($$props.session === void 0 && $$bindings.session && session !== void 0)
    $$bindings.session(session);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<form method="${"POST"}" action="${"?/updateProfile"}">${validate_component(Avatar, "Avatar").$$render(
      $$result,
      { size: 10, url: avatarUrl },
      {
        url: ($$value) => {
          avatarUrl = $$value;
          $$settled = false;
        }
      },
      {}
    )}
    <div><label for="${"email"}">Email</label>
        <input name="${"email"}" id="${"email"}" type="${"text"}"${add_attribute("value", session.user.email, 0)} disabled></div>
    <div><label for="${"name"}">Full Name</label>
        <input name="${"name"}" id="${"name"}" type="${"text"}"${add_attribute("value", fullName, 0)}></div>
    <div><label for="${"website"}">Website</label>
        <input name="${"website"}" id="${"website"}" type="${"text"}"${add_attribute("value", website, 0)}></div>
    <div><input type="${"submit"}" class="${"button block primary"}"${add_attribute("value", "Update", 0)} ${""}></div></form>
<div><button class="${"button block"}" ${""}>Sign Out </button></div>`;
  } while (!$$settled);
  return $$rendered;
});
const Auth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `<body class="${"antialiased bg-body text-body font-body"}"><div class="${""}"><section class="${"h-screen relative pt-16 pb-36 bg-gradient-black2 overflow-hidden"}"><img class="${"absolute top-0 transform left-1/2 -translate-x-1/2"}" src="${"/elements/radial.svg"}" alt="${""}">
        <div class="${"relative z-10 container mx-auto px-4"}"><div class="${"flex flex-wrap -m-6"}"><div class="${"w-full p-6"}"><div class="${"md:max-w-xl text-center mx-auto"}"><h2 class="${"mb-4 font-heading font-bold text-gray-100 text-6xl sm:text-7xl"}">Login in</h2>
                        ${form?.error ? `<div class="${"block notification is-danger"}">${escape(form.error)}</div>` : ``}
                        <p class="${"mb-11 text-lg text-gray-200"}">Welcome back!</p>

                        <form class="${"row flex-center flex"}" method="${"POST"}" action="${"?/signin"}">${form?.missing ? `<p class="${"error"}">The email field is required</p>` : ``}
                            ${form?.incorrect ? `<p class="${"error"}">Invalid credentials!</p>` : ``}
                        <div class="${"flex flex-wrap max-w-md mx-auto -m-2 mb-5"}"><div class="${"w-full p-2"}">
                                <input class="${"w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"}" type="${"email"}" placeholder="${"Email address"}" name="${"email"}" autocomplete="${"username"}"${add_attribute("value", form?.values?.email ?? "", 0)}></div>
                            <div class="${"w-full p-2"}">
                                <input class="${"w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"}" id="${"password"}" type="${"password"}" placeholder="${"Password"}" name="${"password"}" autocomplete="${"current-password"}" required></div>
                            <div class="${"w-full p-2"}"><div class="${"group relative"}"><div class="${"absolute top-0 left-0 w-full h-full bg-gradient-blue opacity-0 group-hover:opacity-50 rounded-lg transition ease-out duration-300"}"></div>
                                    <button class="${"p-1 w-full font-heading font-medium text-base text-white overflow-hidden rounded-md"}"><div class="${"relative py-4 px-9 bg-gradient-blue overflow-hidden rounded-md"}"><input type="${"submit"}" class="${"absolute top-0 left-0 transform -translate-y-full group-hover:-translate-y-0 h-full w-full bg-gray-900 transition ease-in-out duration-500"}" ${""} value="${""}">
                                            <p class="${"relative z-10"}">${escape("Login")}</p></div></button></div></div></div></form>

                        <p class="${"text-base text-gray-200"}"><span>Don’t have an account?</span>
                            <a class="${"text-blue-700 hover:text-blue-500"}" href="${"/register"}">Create free account</a></p></div></div></div></div></section></div></body>`;
});
export {
  Auth as A,
  Account as a
};
