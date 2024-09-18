import { ref, defineComponent, computed, openBlock, createElementBlock, mergeProps, unref, renderSlot } from 'vue';

const isNumber = (val) => {
  return typeof val === "number";
};
const isUndefined = (val) => val === void 0;
const isString = (val) => {
  return val && typeof val === "string";
};
const isStringNumber = (val) => {
  if (isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};

const addUnit = (value, defaultUnit = "px") => {
  if (!value) return;
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
};

const definePropType = (val) => val;

const withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values({})]) {
      app.component(comp.name, comp);
    }
  };
  return main;
};

const statePrefix = "is-";
const _bem = (namespace, block, blockSuffix, element, modifier) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};
const useNamespace = (block) => {
  const namespace = ref("fz");
  const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
  const e = (element) => {
    element ? _bem(namespace.value, block, "", element, "") : "";
  };
  const m = (modifier) => {
    modifier ? _bem(namespace.value, block, "", "", modifier) : "";
  };
  const be = (blockSuffix, element) => {
    blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "";
  };
  const bm = (blockSuffix, modifier) => {
    blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "";
  };
  const em = (element, modifier) => {
    element && modifier ? _bem(namespace.value, block, "", element, modifier) : "";
  };
  const bem = (blockSuffix, element, modifier) => {
    blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "";
  };
  const is = (name, ...args) => {
    const state = args.length >= 1 ? args[0] : true;
    return name && state ? `${statePrefix}${name}` : "";
  };
  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  };
};

const iconProps = {
  /**
   * @description icon 尺寸大小
   */
  size: {
    type: definePropType([String, Number])
  },
  /**
   * @description icon 颜色 svg的填充色
   */
  color: {
    type: String
  }
};

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

const FzIcon = withInstall(_sfc_main);

var Components = [FzIcon];

const INSTALLED_KEY = Symbol("INSTALLED_KEY");

const version$1 = "0.0.0-dev.1";

const makeInstaller = (components) => {
  const install = (app) => {
    if (app[INSTALLED_KEY]) return;
    app[INSTALLED_KEY] = true;
    components.forEach((c) => app.use(c));
  };
  return { install, version: version$1 };
};

var installer = makeInstaller([...Components]);

const install = installer.install;
const version = installer.version;

export { installer as default, install, makeInstaller, version };
