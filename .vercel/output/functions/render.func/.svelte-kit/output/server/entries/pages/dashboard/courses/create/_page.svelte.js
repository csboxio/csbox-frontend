import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape } from "../../../../../chunks/index2.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/supabaseClient.js";
import "react-image-file-resizer";
import "@supabase/auth-helpers-sveltekit";
import "devalue";
import "../../../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $page.data.session;
  let { data } = $$props;
  let course_title;
  let course_prefix;
  let course_number;
  let course_term;
  let step = 1;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `
<body class="${"bg-gray-600 antialiased bg-body text-body font-body"}"><div class="${"from-gray-500 to-gray-500 bg-gradient-to-br antialiased bg-body text-body font-body"}"><form method="${"POST"}" action="${"?/createCourse"}"><section class="${"py-3"}"><div class="${"container px-6 mx-auto"}"><div class="${"min-h-screen gap-4 flex min-w-2/3"}"><div class="${"flex w-2/3 justify-around i items-center md:w-2/3"}"><div class="${"min-w-xs max-w-xs "}"><div class="${"relative group"}"><div class="${"absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-400 rounded-lg blur opacity-10 group-hover:opacity-75 transition duration-1500 group-hover:duration-200 animate-tilt"}"></div>
                      <div><div class="${"relative p-6 bg-gray-700 rounded-xl"}"><img${add_attribute(
      "src",
      "https://dummyimage.com/150x150/000/fff",
      0
    )} class="${"inline-flex items-center justify-center w-20 h-20 mb-6 rounded-lg drop-shadow-2xl"}">
                              <a class="${"inline-block absolute top-1 right-0 m-5 text-gray-300 hover:text-gray-200"}" href="${"#"}"><svg width="${"24"}" height="${"24"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"}" stroke="${"currentColor"}" stroke-width="${"2"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path><path d="${"M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"}" stroke="${"currentColor"}" stroke-width="${"2"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path><path d="${"M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"}" stroke="${"currentColor"}" stroke-width="${"2"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path></svg></a>
                              <h4 class="${"text-xl text-white font-bold mb-3"}">${escape(
      "Software Development"
    )}</h4>
                              <h4 class="${"text-xl text-white font-bold mb-1"}">${escape(
      "CS100"
    )} ${escape(
      "12345"
    )}</h4>
                              <h4 class="${"text-gray-300 mb-1"}">${escape(
      "Spring 2023"
    )}</h4></div></div></div></div></div>

        <div class="${"flex w-2/3 justify-around i items-center md:w-2/3"}"><div class="${"p-9 bg-gray-600 rounded-xl"}">
            <div class="${"flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20"}"><div class="${"w-full sm:w-auto px-4 mb-6 sm:mb-0"}"><h4 class="${"text-2xl font-bold tracking-wide text-white mb-1"}">Create Course</h4></div></div>

            
              <div class="${"pb-12"}"><div class="${"w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"}"><div class="${"bg-blue-600 h-2.5 rounded-full"}" style="${"width: " + escape(step * 33, true) + "%"}"></div></div></div>

            
            ${`<div class="${"flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20"}"><div class="${"w-full sm:w-1/3 px-4 mb-4 sm:mb-0"}"><span class="${"text-sm font-medium text-gray-100"}">Course Title</span></div>
              <div class="${"w-full sm:w-2/3 px-4"}"><div class="${"max-w-xl"}"><div class="${"flex items-center -mx-3"}"><div class="${"w-full sm:w-auto px-3 mb-3 sm:mb-0"}"><input name="${"course_title"}" id="${"course_title"}" type="${"text"}" class="${"block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg"}" placeholder="${"Software Development I"}"${add_attribute("value", course_title, 0)}></div></div></div></div></div>

            <div class="${"flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20"}"><div class="${"w-full sm:w-1/3 px-4 mb-4 sm:mb-0"}"><span class="${"text-sm font-medium text-gray-100"}">Course Prefix</span></div>
              <div class="${"w-full sm:w-2/3 px-4"}"><div class="${"max-w-xl"}"><div class="${"flex flex-wrap items-center -mx-3"}"><div class="${"w-full sm:w-auto px-3 mb-3 sm:mb-0"}"><input name="${"course_prefix"}" id="${"course_prefix"}" type="${"text"}" class="${"block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg"}" placeholder="${"CS100"}"${add_attribute("value", course_prefix, 0)}></div></div></div></div></div>

            <div class="${"flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20"}"><div class="${"w-full sm:w-1/3 px-4 mb-4 sm:mb-0"}"><span class="${"text-sm font-medium text-gray-100"}">Course Number</span></div>
              <div class="${"w-full sm:w-2/3 px-4"}"><div class="${"max-w-xl"}"><div class="${"flex flex-wrap items-center -mx-3"}"><div class="${"w-full sm:w-auto px-3 mb-3 sm:mb-0"}"><input name="${"course_number"}" id="${"course_number"}" type="${"text"}" class="${"block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg"}" placeholder="${"12345"}"${add_attribute("value", course_number, 0)}></div></div></div></div></div>

            <div class="${"flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20"}"><div class="${"w-full sm:w-1/3 px-4 mb-4 sm:mb-0"}"><span class="${"text-sm font-medium text-gray-100"}">Course Term</span></div>
              <div class="${"w-full sm:w-2/3 px-4"}"><div class="${"max-w-xl"}"><div class="${"flex flex-wrap items-center -mx-3"}"><div class="${"w-full sm:w-auto px-3 mb-3 sm:mb-0"}"><input name="${"course_term"}" id="${"course_term"}" type="${"text"}" class="${"block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg"}" placeholder="${"Spring 2023"}"${add_attribute("value", course_term, 0)}></div></div></div></div></div>

            

            <div class="${"flex justify-between w-full sm:w-auto"}"><div>
                  
                <a class="${"inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"}" href="${"/dashboard/courses"}">Cancel</a></div>

                <button class="${"inline-block py-2 px-4 text-sm text-center font-bold leading-normal text-gray-200 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200"}" type="${"submit"}">${``}
                    Next
                </button></div>
                `}</div></div></div></div></section></form></div></body>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
