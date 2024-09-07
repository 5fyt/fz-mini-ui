(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FzMini = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

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
    if (!value)
      return;
    if (isNumber(value) || isStringNumber(value)) {
      return `${value}${defaultUnit}`;
    } else if (isString(value)) {
      return value;
    }
  };

  const definePropType = (val) => val;

  const withInstall = (main, extra) => {
    main.install = (app) => {
      for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
        app.component(comp.name, comp);
      }
    };
    if (extra) {
      for (const [key, comp] of Object.values(extra)) {
        main[key] = comp;
      }
    }
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
    const namespace = vue.ref("fz");
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
    size: {
      type: definePropType([String, Number])
    },
    color: {
      type: String
    }
  };

  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };

  const __default__ = vue.defineComponent({
    name: "FzIcon"
  });
  const _sfc_main = vue.defineComponent({
    ...__default__,
    props: iconProps,
    setup(__props) {
      const props = __props;
      const ns = useNamespace("icon");
      const style = vue.computed(() => {
        const { size, color } = props;
        if (!size && !color)
          return {};
        return {
          fontSize: isUndefined(size) ? void 0 : addUnit(size),
          "--color": color
        };
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
          class: vue.unref(ns).b(),
          style: style.value
        }, _ctx.$attrs), [
          vue.renderSlot(_ctx.$slots, "default")
        ], 16);
      };
    }
  });
  var Icon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "icon.vue"]]);

  const FzIcon = withInstall(Icon);

  var Components = [FzIcon];

  const INSTALLED_KEY = Symbol("INSTALLED_KEY");

  const version$1 = "0.0.0-dev.1";

  const makeInstaller = (components) => {
    const install = (app) => {
      if (app[INSTALLED_KEY])
        return;
      app[INSTALLED_KEY] = true;
      components.forEach((c) => app.use(c));
    };
    return { install, version: version$1 };
  };

  var installer = makeInstaller([...Components]);

  const install = installer.install;
  const version = installer.version;

  exports["default"] = installer;
  exports.install = install;
  exports.makeInstaller = makeInstaller;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
