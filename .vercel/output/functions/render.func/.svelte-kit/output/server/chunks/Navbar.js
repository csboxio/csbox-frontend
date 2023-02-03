import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape, v as validate_component } from "./index2.js";
import "./supabaseClient.js";
import { p as page } from "./stores.js";
import { faBars, faTachometer, faBook, faCalendar, faInbox, faGear } from "@fortawesome/free-solid-svg-icons";
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { showTopRightMenuModel = false } = $$props;
  function handleToggleMenuTopRight(s) {
    showTopRightMenuModel = s == "inside" && !showTopRightMenuModel;
  }
  let user = $page.data.user.userData;
  let email = $page.data.session.user.email;
  let avatarUrl = user.avatar_url;
  let first_name = user.first_name;
  let last_name = user.last_name;
  if ($$props.showTopRightMenuModel === void 0 && $$bindings.showTopRightMenuModel && showTopRightMenuModel !== void 0)
    $$bindings.showTopRightMenuModel(showTopRightMenuModel);
  if ($$props.handleToggleMenuTopRight === void 0 && $$bindings.handleToggleMenuTopRight && handleToggleMenuTopRight !== void 0)
    $$bindings.handleToggleMenuTopRight(handleToggleMenuTopRight);
  $$unsubscribe_page();
  return `<div class="${"w-full sm:w-auto"}"><div class="${"relative inline-block text-left"}"><div><button type="${"button"}" class="${"inline-flex items-center justify-center py-2 pl-2 pr-3 bg-gray-500 hover:bg-gray-400 hover:bg-opacity-40 transition duration-150 rounded-full"}" id="${"menu-button"}" aria-expanded="${"true"}" aria-haspopup="${"true"}"><img class="${"h-8 w-8 mr-3 rounded-full object-cover"}"${add_attribute("src", avatarUrl, 0)} alt="${""}">
    <h4 class="${"text-white font-bold tracking-wide mr-5"}">${escape(first_name)} ${escape(last_name)}</h4>
    <svg width="${"10"}" height="${"6"}" viewBox="${"0 0 10 6"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M1 1L5 5L9 1"}" stroke="${"#3D485B"}" stroke-width="${"2"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path></svg></button>

  ${showTopRightMenuModel ? `<div class="${"absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"}" role="${"menu"}" aria-orientation="${"vertical"}" aria-labelledby="${"menu-button"}" tabindex="${"-1"}"><div class="${"px-4 py-3 text-sm text-gray-900 dark:text-white"}"><div class="${"truncate font-bold"}">${escape(email)}</div></div>
      <div class="${"py-1"}" role="${"none"}">
        <a href="${"/dashboard/profile"}" class="${"font-semibold text-gray-100 block px-4 py-2 text-sm hover:bg-gray-700"}" role="${"menuitem"}" tabindex="${"-1"}" id="${"menu-item-0"}">Account settings</a>
        <button type="${"submit"}" class="${"font-semibold text-gray-100 block w-full px-4 py-2 text-left text-sm hover:bg-gray-700"}" role="${"menuitem"}" tabindex="${"-1"}" id="${"menu-item-3"}">Sign out</button></div></div>` : ``}</div></div></div>`;
});
const parseNumber = parseFloat;
function joinCss(obj, separator = ";") {
  let texts;
  if (Array.isArray(obj)) {
    texts = obj.filter((text) => text);
  } else {
    texts = [];
    for (const prop in obj) {
      if (obj[prop]) {
        texts.push(`${prop}:${obj[prop]}`);
      }
    }
  }
  return texts.join(separator);
}
function getStyles(style, size, pull, fw) {
  let float;
  let width;
  const height = "1em";
  let lineHeight;
  let fontSize;
  let textAlign;
  let verticalAlign = "-.125em";
  const overflow = "visible";
  if (fw) {
    textAlign = "center";
    width = "1.25em";
  }
  if (pull) {
    float = pull;
  }
  if (size) {
    if (size == "lg") {
      fontSize = "1.33333em";
      lineHeight = ".75em";
      verticalAlign = "-.225em";
    } else if (size == "xs") {
      fontSize = ".75em";
    } else if (size == "sm") {
      fontSize = ".875em";
    } else {
      fontSize = size.replace("x", "em");
    }
  }
  return joinCss([
    joinCss({
      float,
      width,
      height,
      "line-height": lineHeight,
      "font-size": fontSize,
      "text-align": textAlign,
      "vertical-align": verticalAlign,
      "transform-origin": "center",
      overflow
    }),
    style
  ]);
}
function getTransform(scale, translateX, translateY, rotate, flip, translateTimes = 1, translateUnit = "", rotateUnit = "") {
  let flipX = 1;
  let flipY = 1;
  if (flip) {
    if (flip == "horizontal") {
      flipX = -1;
    } else if (flip == "vertical") {
      flipY = -1;
    } else {
      flipX = flipY = -1;
    }
  }
  return joinCss(
    [
      `translate(${parseNumber(translateX) * translateTimes}${translateUnit},${parseNumber(translateY) * translateTimes}${translateUnit})`,
      `scale(${flipX * parseNumber(scale)},${flipY * parseNumber(scale)})`,
      rotate && `rotate(${rotate}${rotateUnit})`
    ],
    " "
  );
}
const fa_svelte_svelte_type_style_lang = "";
const css = {
  code: ".spin.svelte-1cj2gr0{animation:svelte-1cj2gr0-spin 2s 0s infinite linear}.pulse.svelte-1cj2gr0{animation:svelte-1cj2gr0-spin 1s infinite steps(8)}@keyframes svelte-1cj2gr0-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: null
};
const Fa = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  let { id = "" } = $$props;
  let { style = "" } = $$props;
  let { icon } = $$props;
  let { size = "" } = $$props;
  let { color = "" } = $$props;
  let { fw = false } = $$props;
  let { pull = "" } = $$props;
  let { scale = 1 } = $$props;
  let { translateX = 0 } = $$props;
  let { translateY = 0 } = $$props;
  let { rotate = "" } = $$props;
  let { flip = false } = $$props;
  let { spin = false } = $$props;
  let { pulse = false } = $$props;
  let { primaryColor = "" } = $$props;
  let { secondaryColor = "" } = $$props;
  let { primaryOpacity = 1 } = $$props;
  let { secondaryOpacity = 0.4 } = $$props;
  let { swapOpacity = false } = $$props;
  let i;
  let s;
  let transform;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.fw === void 0 && $$bindings.fw && fw !== void 0)
    $$bindings.fw(fw);
  if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0)
    $$bindings.pull(pull);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
    $$bindings.scale(scale);
  if ($$props.translateX === void 0 && $$bindings.translateX && translateX !== void 0)
    $$bindings.translateX(translateX);
  if ($$props.translateY === void 0 && $$bindings.translateY && translateY !== void 0)
    $$bindings.translateY(translateY);
  if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0)
    $$bindings.rotate(rotate);
  if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0)
    $$bindings.flip(flip);
  if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0)
    $$bindings.spin(spin);
  if ($$props.pulse === void 0 && $$bindings.pulse && pulse !== void 0)
    $$bindings.pulse(pulse);
  if ($$props.primaryColor === void 0 && $$bindings.primaryColor && primaryColor !== void 0)
    $$bindings.primaryColor(primaryColor);
  if ($$props.secondaryColor === void 0 && $$bindings.secondaryColor && secondaryColor !== void 0)
    $$bindings.secondaryColor(secondaryColor);
  if ($$props.primaryOpacity === void 0 && $$bindings.primaryOpacity && primaryOpacity !== void 0)
    $$bindings.primaryOpacity(primaryOpacity);
  if ($$props.secondaryOpacity === void 0 && $$bindings.secondaryOpacity && secondaryOpacity !== void 0)
    $$bindings.secondaryOpacity(secondaryOpacity);
  if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0)
    $$bindings.swapOpacity(swapOpacity);
  $$result.css.add(css);
  i = icon && icon.icon || [0, 0, "", [], ""];
  s = getStyles(style, size, pull, fw);
  transform = getTransform(scale, translateX, translateY, rotate, flip, 512);
  return `${i[4] ? `<svg${add_attribute("id", id || void 0, 0)} class="${[
    "svelte-fa " + escape(clazz, true) + " svelte-1cj2gr0",
    (pulse ? "pulse" : "") + " " + (spin ? "spin" : "")
  ].join(" ").trim()}"${add_attribute("style", s, 0)} viewBox="${"0 0 " + escape(i[0], true) + " " + escape(i[1], true)}" aria-hidden="${"true"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}"><g transform="${"translate(" + escape(i[0] / 2, true) + " " + escape(i[1] / 2, true) + ")"}" transform-origin="${escape(i[0] / 4, true) + " 0"}"><g${add_attribute("transform", transform, 0)}>${typeof i[4] == "string" ? `<path${add_attribute("d", i[4], 0)}${add_attribute("fill", color || primaryColor || "currentColor", 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>` : `
          <path${add_attribute("d", i[4][0], 0)}${add_attribute("fill", secondaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity, 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>
          <path${add_attribute("d", i[4][1], 0)}${add_attribute("fill", primaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity, 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>`}</g></g></svg>` : ``}`;
});
const Fa$1 = Fa;
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div><nav class="${"lg:hidden flex items-center justify-between p-8 bg-gray-700 mb-3"}"><div class="${"w-full xl:w-auto px-2 xl:mr-12"}"><div class="${"flex items-center justify-between"}"><a class="${"inline-flex items-center h-8"}"${add_attribute("href", "#", 0)}><img class="${"object-contain"}" src="${""}" alt="${""}"></a>
        <div class="${"xl:hidden"}"><button class="${"navbar-burger text-gray-400 hover:text-gray-300 focus:outline-none"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faBars, size: "lg" }, {}, {})}
              <title>Mobile menu</title></button></div></div></div></nav>
  <div class="${"hidden lg:block navbar-menu relative z-50"}"><div class="${"lg:hidden navbar-backdrop fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50"}"></div>
    <nav class="${"fixed top-0 left-0 bottom-0 max-w-max flex flex-col h-full py-12 px-4 bg-gray-700 overflow-auto"}"><a class="${"inline-block mb-12"}"${add_attribute("href", "#", 0)}><img class="${"object-contain h-7 mx-auto"}" src="${""}" alt="${""}"></a>
      <div class="${"mb-6"}"><ul><li><a class="${"flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-gray-800 mb-2"}" href="${"/dashboard"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faTachometer, size: "lg" }, {}, {})}</a></li>
          <li><a class="${"flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-gray-800 mb-2"}" href="${"/dashboard/courses"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faBook, size: "lg" }, {}, {})}</a></li>
          <li><a class="${"flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-gray-800 mb-2"}"${add_attribute("href", "#", 0)}>${validate_component(Fa$1, "Fa").$$render($$result, { icon: faCalendar, size: "lg" }, {}, {})}</a></li>
          <li><a class="${"flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-gray-800 mb-2"}"${add_attribute("href", "#", 0)}>${validate_component(Fa$1, "Fa").$$render($$result, { icon: faInbox, size: "lg" }, {}, {})}</a></li>
          <li><a class="${"flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-gray-800 mb-2"}"${add_attribute("href", "#", 0)}>${validate_component(Fa$1, "Fa").$$render($$result, { icon: faGear, size: "lg" }, {}, {})}</a></li></ul></div>
      <div class="${"mt-auto"}"><a class="${"flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-gray-800"}"${add_attribute("href", "#", 0)}><svg width="${"20"}" height="${"22"}" viewBox="${"0 0 20 22"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M13.71 11.7099C14.6904 10.9385 15.406 9.8808 15.7572 8.68382C16.1085 7.48684 16.0779 6.21015 15.6698 5.03135C15.2617 3.85255 14.4963 2.83027 13.4801 2.10674C12.4639 1.3832 11.2474 0.994385 10 0.994385C8.75255 0.994385 7.53611 1.3832 6.51993 2.10674C5.50374 2.83027 4.73834 3.85255 4.33021 5.03135C3.92208 6.21015 3.89151 7.48684 4.24276 8.68382C4.59401 9.8808 5.3096 10.9385 6.29 11.7099C4.61007 12.3829 3.14428 13.4992 2.04889 14.9398C0.953495 16.3804 0.26956 18.0912 0.0699967 19.8899C0.0555513 20.0212 0.0671132 20.1541 0.104022 20.2809C0.140931 20.4078 0.202464 20.5261 0.285108 20.6292C0.452016 20.8374 0.69478 20.9707 0.959997 20.9999C1.22521 21.0291 1.49116 20.9517 1.69932 20.7848C1.90749 20.6179 2.04082 20.3751 2.07 20.1099C2.28958 18.1551 3.22168 16.3497 4.68822 15.0387C6.15475 13.7277 8.0529 13.0029 10.02 13.0029C11.9871 13.0029 13.8852 13.7277 15.3518 15.0387C16.8183 16.3497 17.7504 18.1551 17.97 20.1099C17.9972 20.3556 18.1144 20.5825 18.2991 20.7469C18.4838 20.9113 18.7228 21.0014 18.97 20.9999H19.08C19.3421 20.9697 19.5817 20.8372 19.7466 20.6311C19.9114 20.4251 19.9881 20.1622 19.96 19.8999C19.7595 18.0961 19.0719 16.3809 17.9708 14.9381C16.8698 13.4953 15.3969 12.3794 13.71 11.7099ZM10 10.9999C9.20887 10.9999 8.43551 10.7653 7.77772 10.3258C7.11992 9.88623 6.60723 9.26152 6.30448 8.53061C6.00173 7.79971 5.92251 6.99544 6.07686 6.21952C6.2312 5.4436 6.61216 4.73086 7.17157 4.17145C7.73098 3.61204 8.44371 3.23108 9.21964 3.07674C9.99556 2.9224 10.7998 3.00161 11.5307 3.30436C12.2616 3.60711 12.8863 4.1198 13.3259 4.7776C13.7654 5.4354 14 6.20876 14 6.99988C14 8.06075 13.5786 9.07816 12.8284 9.82831C12.0783 10.5785 11.0609 10.9999 10 10.9999Z"}" fill="${"currentColor"}"></path></svg></a>
        <a class="${"flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-blue-500 bg-gray-800"}"${add_attribute("href", "#", 0)}><svg width="${"20"}" height="${"20"}" viewBox="${"0 0 20 20"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M10.59 11.0001L8.29 13.2901C8.19627 13.3831 8.12188 13.4937 8.07111 13.6155C8.02034 13.7374 7.9942 13.8681 7.9942 14.0001C7.9942 14.1321 8.02034 14.2628 8.07111 14.3847C8.12188 14.5065 8.19627 14.6171 8.29 14.7101C8.38296 14.8038 8.49356 14.8782 8.61542 14.929C8.73728 14.9798 8.86799 15.0059 9 15.0059C9.13201 15.0059 9.26272 14.9798 9.38458 14.929C9.50644 14.8782 9.61704 14.8038 9.71 14.7101L13.71 10.7101C13.801 10.615 13.8724 10.5029 13.92 10.3801C14.02 10.1366 14.02 9.86356 13.92 9.6201C13.8724 9.49735 13.801 9.3852 13.71 9.2901L9.71 5.2901C9.61676 5.19686 9.50607 5.1229 9.38425 5.07244C9.26243 5.02198 9.13186 4.99601 9 4.99601C8.86814 4.99601 8.73757 5.02198 8.61575 5.07244C8.49393 5.1229 8.38324 5.19686 8.29 5.2901C8.19676 5.38334 8.1228 5.49403 8.07234 5.61585C8.02188 5.73767 7.99591 5.86824 7.99591 6.0001C7.99591 6.13196 8.02188 6.26253 8.07234 6.38435C8.1228 6.50617 8.19676 6.61686 8.29 6.7101L10.59 9.0001H1C0.734784 9.0001 0.48043 9.10546 0.292893 9.29299C0.105357 9.48053 0 9.73488 0 10.0001C0 10.2653 0.105357 10.5197 0.292893 10.7072C0.48043 10.8947 0.734784 11.0001 1 11.0001H10.59ZM10 9.96937e-05C8.13109 -0.00824409 6.29724 0.507313 4.70647 1.48829C3.11569 2.46927 1.83165 3.87641 1 5.5501C0.880653 5.78879 0.861015 6.06512 0.945406 6.3183C1.0298 6.57147 1.21131 6.78075 1.45 6.9001C1.68869 7.01945 1.96502 7.03909 2.2182 6.95469C2.47137 6.8703 2.68065 6.68879 2.8 6.4501C3.43219 5.17342 4.39383 4.08872 5.58555 3.30809C6.77727 2.52746 8.15582 2.07922 9.57876 2.00969C11.0017 1.94017 12.4174 2.25188 13.6795 2.91261C14.9417 3.57334 16.0045 4.55913 16.7581 5.7681C17.5118 6.97706 17.9289 8.36535 17.9664 9.78948C18.0039 11.2136 17.6605 12.6219 16.9715 13.8689C16.2826 15.1159 15.2731 16.1563 14.0475 16.8825C12.8219 17.6088 11.4246 17.9946 10 18.0001C8.50888 18.0066 7.04615 17.5925 5.77969 16.8053C4.51323 16.0182 3.49435 14.89 2.84 13.5501C2.72065 13.3114 2.51137 13.1299 2.2582 13.0455C2.00502 12.9611 1.72869 12.9808 1.49 13.1001C1.25131 13.2194 1.0698 13.4287 0.985406 13.6819C0.901015 13.9351 0.920653 14.2114 1.04 14.4501C1.83283 16.0456 3.03752 17.4003 4.52947 18.3741C6.02142 19.348 7.74645 19.9055 9.52612 19.9891C11.3058 20.0727 13.0755 19.6793 14.6521 18.8496C16.2288 18.0199 17.5552 16.7841 18.4941 15.2699C19.433 13.7558 19.9503 12.0182 19.9925 10.2371C20.0347 8.45597 19.6003 6.69589 18.7342 5.13893C17.8682 3.58197 16.6018 2.28467 15.0663 1.38121C13.5307 0.477745 11.7816 0.000936146 10 9.96937e-05Z"}" fill="${"currentColor"}"></path></svg></a></div></nav></div></div>`;
});
export {
  Navbar as N,
  Settings as S
};
