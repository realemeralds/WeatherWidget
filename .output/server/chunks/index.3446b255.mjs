import { _ as _export_sfc, v as vue_cjs_prod, a as _sfc_main$3, b as __nuxt_component_1 } from './server.mjs';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_SearchBar = _sfc_main$3;
  const _component_Socials = __nuxt_component_1;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "relative flex h-screen w-screen flex-col items-center justify-center" }, _attrs))}><a href="#" class="mb-6 text-3xl font-light text-white">WeatherWidget</a>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_SearchBar, { sizing: "expanded" }, null, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_Socials, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index.3446b255.mjs.map
