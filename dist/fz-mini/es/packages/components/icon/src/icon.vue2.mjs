import '../../../../node_modules/.pnpm/vue@3.5.6_typescript@5.6.2/node_modules/vue/dist/vue.runtime.esm-bundler.mjs';
import '../../../hooks/index.mjs';
import '../../../utils/index.mjs';
import { iconProps } from './icon.mjs';
import { defineComponent, computed, openBlock, createElementBlock, mergeProps, renderSlot } from '../../../../node_modules/.pnpm/@vue_runtime-core@3.5.6/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { isUndefined } from '../../../utils/types.mjs';
import { addUnit } from '../../../utils/dom/style.mjs';
import { unref } from '../../../../node_modules/.pnpm/@vue_reactivity@3.5.6/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.mjs';

const __default__ = defineComponent({
  name: "FzIcon",
  inheritAttrs: false
});
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: iconProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("icon");
    const style = computed(() => {
      const { size, color } = props;
      if (!size && !color) return {};
      return {
        fontSize: isUndefined(size) ? void 0 : addUnit(size),
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "i",
        mergeProps({
          class: unref(ns).b(),
          style: style.value
        }, _ctx.$attrs),
        [
          renderSlot(_ctx.$slots, "default")
        ],
        16
        /* FULL_PROPS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=icon.vue2.mjs.map
