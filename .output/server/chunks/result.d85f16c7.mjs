import { v as vue_cjs_prod, c as useRoute, a as _sfc_main$3, d as __nuxt_component_1$1, u as useNuxtApp } from './server.mjs';
import { s as serverRenderer } from './renderer.mjs';
import 'unenv/runtime/mock/proxy';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'h3';
import 'defu';
import '@fortawesome/vue-fontawesome';
import 'throttle-debounce';
import '@apollo/client/core';
import 'ts-invariant';
import '@wry/equality';
import 'zen-observable-ts';
import 'graphql';
import 'optimism';
import '@wry/context';
import '@wry/trie';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';
import 'node:url';
import 'ipx';
import 'stream';

const wrapInRef = (value) => vue_cjs_prod.isRef(value) ? value : vue_cjs_prod.ref(value);
const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  if (options.defer) {
    console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC.");
  }
  options.lazy = (_d = (_c = options.lazy) != null ? _c : options.defer) != null ? _d : false;
  options.initialCache = (_e = options.initialCache) != null ? _e : true;
  const nuxt = useNuxtApp();
  const instance = vue_cjs_prod.getCurrentInstance();
  if (instance && !instance._nuxtOnBeforeMountCbs) {
    const cbs = instance._nuxtOnBeforeMountCbs = [];
    if (instance && false) {
      vue_cjs_prod.onUnmounted(() => cbs.splice(0, cbs.length));
    }
  }
  const useInitialCache = () => options.initialCache && nuxt.payload.data[key] !== void 0;
  const asyncData = {
    data: wrapInRef((_f = nuxt.payload.data[key]) != null ? _f : options.default()),
    pending: vue_cjs_prod.ref(!useInitialCache()),
    error: vue_cjs_prod.ref((_g = nuxt.payload._errors[key]) != null ? _g : null)
  };
  asyncData.refresh = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      return nuxt._asyncDataPromises[key];
    }
    if (opts._initial && useInitialCache()) {
      return nuxt.payload.data[key];
    }
    asyncData.pending.value = true;
    nuxt._asyncDataPromises[key] = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((result) => {
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      asyncData.error.value = error;
      asyncData.data.value = vue_cjs_prod.unref(options.default());
    }).finally(() => {
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = true;
      }
      delete nuxt._asyncDataPromises[key];
    });
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer) {
    const promise = initialFetch();
    vue_cjs_prod.onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || autoKey;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = "$f" + _key;
  const _request = vue_cjs_prod.computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return vue_cjs_prod.isRef(r) ? r.value : r;
  });
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    initialCache,
    ...fetchOptions
  } = opts;
  const _fetchOptions = {
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  };
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    initialCache,
    watch: [
      _request,
      ...watch || []
    ]
  };
  const asyncData = useAsyncData(key, () => {
    return $fetch(_request.value, _fetchOptions);
  }, _asyncDataOptions, "$2Qpjr020wX");
  return asyncData;
}
function useLazyFetch(request, arg1, arg2) {
  const [opts, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  return useFetch(
    request,
    {
      ...opts,
      lazy: true
    },
    autoKey
  );
}
const _sfc_main = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "result",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedTimeIndex = vue_cjs_prod.ref(1);
    const selectedTimeStyle = vue_cjs_prod.ref("bg-primaryAccent text-white");
    const tempDropdown = vue_cjs_prod.ref(false);
    const selectedTemperatureIndex = vue_cjs_prod.ref(0);
    const selectedTemperatureList = [
      "Metric (km/h, \xB0C)",
      "Imperial (mph, \xB0F)",
      "Standard (km/h, K)"
    ];
    const hexCodePattern = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g;
    const colorState = vue_cjs_prod.reactive({
      fieldNames: ["Background", "Text", "Accent"],
      defaultColorList: ["0C120C", "FFFFFF", "FFFFFF"],
      colorInputList: vue_cjs_prod.ref(["0C120C", "FFFFFF", "FFFFFF"]),
      inputDisabled: true
    });
    const renderedColorList = vue_cjs_prod.computed(
      () => colorState.colorInputList.map(
        (element, index) => hexCodePattern.test(element) ? `#${element}` : colorState.defaultColorList[index]
      )
    );
    const coordinateState = vue_cjs_prod.reactive({
      coordinates: ["", ""],
      inputDisabled: true
    });
    const extraInfoState = vue_cjs_prod.reactive({
      text: [
        "Chance of Rain",
        "Wind Speed & Direction",
        "Humidity",
        "Atmospheric Pressure",
        "Cloud Cover"
      ],
      fieldState: [true, true, false, false, false],
      restDisabled: vue_cjs_prod.computed(() => {
        let sum = 0;
        extraInfoState.fieldState.forEach((element) => {
          sum += +element;
        });
        return sum >= 2;
      })
    });
    const route = useRoute();
    route.query;
    useLazyFetch("", "$HPkZRrqLJX");
    vue_cjs_prod.watch(() => route.query, () => {
      fetchData();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchBar = _sfc_main$3;
      const _component_font_awesome_icon = vue_cjs_prod.resolveComponent("font-awesome-icon");
      const _component_nuxt_img = __nuxt_component_1$1;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "relative flex justify-center overflow-hidden" }, _attrs))}><div class="absolute top-4 flex h-min w-full flex-row justify-between pl-12 pr-8"><p class="text-4xl font-light text-white">WeatherWidget</p>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_SearchBar, {
        sizing: "compact",
        "results-disabled": "True",
        class: "mt-[2px]"
      }, null, _parent));
      _push(`</div><div class="align-start flex h-full w-full flex-grow flex-row justify-start"><div class="relative flex h-screen w-[430px] translate-y-[72px] flex-col items-start rounded-tr-[50px] bg-optionsBG px-11 pt-6 text-white"><button class="absolute top-9 right-10">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_font_awesome_icon, {
        icon: "fa-solid fa-chevron-left",
        class: "text-2xl"
      }, null, _parent));
      _push(`</button><p class="mb-3 self-center text-4xl">Settings</p><div class="mb-4 w-[400px] self-center rounded-full border-b-2 border-b-optionsSeparator"></div><p class="mb-1 text-2xl font-light">Units</p><button id="dropdownDefault" data-dropdown-toggle="dropdown" class="inline-flex w-full items-center justify-between rounded-lg bg-optionsNormalBG py-2.5 pr-2 pl-4 text-center text-xl font-light text-black hover:bg-optionsFocusBG focus:outline-none focus:ring-2 focus:ring-[#F9A1EA]" type="button">${serverRenderer.exports.ssrInterpolate(selectedTemperatureList[selectedTemperatureIndex.value])} <svg class="ml-4 h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="${serverRenderer.exports.ssrRenderClass([{ hidden: !tempDropdown.value }, "absolute top-48 z-10 mt-2 w-[412px] overflow-hidden rounded-md"])}"><!--[-->`);
      serverRenderer.exports.ssrRenderList(selectedTemperatureList, (value, index) => {
        _push(`<button class="relative z-20 flex w-full items-center bg-optionsNormalBG py-2 px-3 hover:bg-optionsFocusBG"><p class="text-xl font-light text-black">${serverRenderer.exports.ssrInterpolate(value)}</p></button>`);
      });
      _push(`<!--]--></div><div class="mt-4 flex w-full items-center justify-between"><p class="text-2xl font-light">Set custom colours</p><label class="relative inline-flex cursor-pointer items-center"><input type="checkbox" value="" class="peer sr-only relative z-20"><div class="relative z-0 h-6 w-11 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[&#39;&#39;] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div></label></div><div class="flex w-full flex-col space-y-3 border-l-2 border-l-optionsSeparator pt-2 pb-1 pl-4"><!--[-->`);
      serverRenderer.exports.ssrRenderList(colorState.fieldNames, (item, index) => {
        _push(`<div class="relative inline-flex w-full flex-row items-center justify-between"><p class="text-xl font-light text-white">${serverRenderer.exports.ssrInterpolate(item)}</p><input class="mr-[66px] w-32 rounded-xl py-2 pl-8 text-xl font-light text-black focus:outline-none disabled:bg-stone-300" type="text" id="backgroundUserInput"${serverRenderer.exports.ssrIncludeBooleanAttr(colorState.inputDisabled) ? " disabled" : ""}${serverRenderer.exports.ssrRenderAttr("value", colorState.colorInputList[index])} maxlength="6"><p class="absolute left-[141px] text-xl font-light text-slate-500"> # </p><div class="absolute right-[34px] top-1/2 h-0 w-0 -translate-y-1/2 border-8" style="${serverRenderer.exports.ssrRenderStyle({
          backgroundColor: vue_cjs_prod.unref(renderedColorList)[index],
          borderColor: vue_cjs_prod.unref(renderedColorList)[index]
        })}"></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-5 flex w-full items-center justify-between"><p class="text-2xl font-light">Set coordinates</p><label class="relative inline-flex cursor-pointer items-center"><input type="checkbox" value="" class="peer sr-only relative z-20"><div class="relative z-10 h-6 w-11 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[&#39;&#39;] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div></label></div><div class="flex w-full flex-col space-y-3 border-l-2 border-l-optionsSeparator pt-2 pb-1 pl-4"><div class="relative inline-flex w-full flex-row items-center justify-between"><p class="text-xl font-light text-white">Latitude</p><input class="mr-[50px] w-40 rounded-xl py-2 px-4 text-xl font-light text-black focus:outline-none disabled:bg-stone-300" type="text" maxlength="15"${serverRenderer.exports.ssrRenderAttr("value", coordinateState.coordinates[0])}${serverRenderer.exports.ssrIncludeBooleanAttr(coordinateState.inputDisabled) ? " disabled" : ""}></div><div class="relative inline-flex w-full flex-row items-center justify-between"><p class="text-xl font-light text-white">Longitude</p><input class="mr-[50px] w-40 rounded-xl py-2 px-4 text-xl font-light text-black focus:outline-none disabled:bg-stone-300" type="text" maxlength="15"${serverRenderer.exports.ssrRenderAttr("value", coordinateState.coordinates[1])}${serverRenderer.exports.ssrIncludeBooleanAttr(coordinateState.inputDisabled) ? " disabled" : ""}></div></div><p class="mt-5 text-2xl font-light">Extra Info</p><div class="flex w-full flex-col space-y-1 border-l-2 border-l-optionsSeparator pt-1 pb-1 pl-4"><!--[-->`);
      serverRenderer.exports.ssrRenderList(extraInfoState.text, (item, index) => {
        _push(`<div class="inline-flex w-full items-center justify-between"><p class="text-xl font-light text-white">${serverRenderer.exports.ssrInterpolate(item)}</p><label class="relative inline-flex cursor-pointer items-center"><input type="checkbox" value="" class="peer sr-only relative z-20"${serverRenderer.exports.ssrIncludeBooleanAttr(extraInfoState.fieldState[index]) ? " checked" : ""}${serverRenderer.exports.ssrIncludeBooleanAttr(
          !extraInfoState.fieldState[index] && extraInfoState.restDisabled
        ) ? " disabled" : ""}><div class="relative z-0 h-6 w-11 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[&#39;&#39;] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div></label></div>`);
      });
      _push(`<!--]--></div><p class="w-full text-center text-sm font-light text-[#B98080]"> you can only select up to 2 extra fields </p></div><div class="absolute inset-0 left-32 flex h-full w-full flex-col justify-center"><div class="mb-4 flex flex-row justify-center space-x-3"><!--[-->`);
      serverRenderer.exports.ssrRenderList(3, (index) => {
        _push(`<div class="${serverRenderer.exports.ssrRenderClass([[index === selectedTimeIndex.value ? selectedTimeStyle.value : ""], "rounded-full bg-white px-3 py-1"])}"><p class="font-light">${serverRenderer.exports.ssrInterpolate(index * 2 - 1)}-day</p></div>`);
      });
      _push(`<!--]--></div><p class="mb-3 text-center text-3xl font-bold text-white">Singapore</p><div class="flex flex-col items-center justify-center text-white"><p class="mr-1 text-xl">now</p><div class="flex flex-row items-center space-x-4"><div class="flex flex-col justify-center"><div class="flex w-full justify-center">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_nuxt_img, {
        src: "/partly_sunny_white.png",
        class: "max-w-[70px]",
        fit: "inside",
        width: "100"
      }, null, _parent));
      _push(`</div><p class="italic">partly sunny</p></div><div class="mt-2 flex flex-col"><p class="text-3xl leading-none">28\xB0C</p><p class="text-md relative mb-1 font-pro font-light leading-none"> feels like: 33\xB0C </p><div class="flex w-full flex-row space-x-2"><div class="flex flex-row items-center space-x-[2px]">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_nuxt_img, {
        src: "/rain_icon.svg",
        width: "24"
      }, null, _parent));
      _push(`<p class="relative right-[2px] font-pro text-xs font-thin"> 80% </p></div><div class="relative flex flex-row items-center space-x-[2px]">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_nuxt_img, {
        src: "/cardinal.svg",
        width: "14"
      }, null, _parent));
      _push(`<p class="font-pro text-xs font-thin">2.1m/s</p></div></div></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/result.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=result.d85f16c7.mjs.map
