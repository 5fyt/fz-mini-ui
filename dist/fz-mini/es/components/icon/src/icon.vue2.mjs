import { defineComponent, computed, openBlock, createElementBlock, mergeProps, unref, renderSlot } from 'vue';
import '../../../hooks/index.mjs';
import '../../../utils/index.mjs';
import { iconProps } from './icon.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { isUndefined } from '../../../utils/types.mjs';
import { addUnit } from '../../../utils/dom/style.mjs';

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
