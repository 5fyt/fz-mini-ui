'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../../node_modules/.pnpm/vue@3.5.6_typescript@5.6.2/node_modules/vue/dist/vue.runtime.esm-bundler.js');
require('../../../hooks/index.js');
require('../../../utils/index.js');
var icon = require('./icon.js');
var runtimeCore_esmBundler = require('../../../../node_modules/.pnpm/@vue_runtime-core@3.5.6/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js');
var index = require('../../../hooks/use-namespace/index.js');
var types = require('../../../utils/types.js');
var style = require('../../../utils/dom/style.js');
var reactivity_esmBundler = require('../../../../node_modules/.pnpm/@vue_reactivity@3.5.6/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js');

const __default__ = runtimeCore_esmBundler.defineComponent({
  name: "FzIcon",
  inheritAttrs: false
});
var _sfc_main = /* @__PURE__ */ runtimeCore_esmBundler.defineComponent({
  ...__default__,
  props: icon.iconProps,
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("icon");
    const style$1 = runtimeCore_esmBundler.computed(() => {
      const { size, color } = props;
      if (!size && !color) return {};
      return {
        fontSize: types.isUndefined(size) ? void 0 : style.addUnit(size),
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return runtimeCore_esmBundler.openBlock(), runtimeCore_esmBundler.createElementBlock(
        "i",
        runtimeCore_esmBundler.mergeProps({
          class: reactivity_esmBundler.unref(ns).b(),
          style: style$1.value
        }, _ctx.$attrs),
        [
          runtimeCore_esmBundler.renderSlot(_ctx.$slots, "default")
        ],
        16
        /* FULL_PROPS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=icon.vue2.js.map
