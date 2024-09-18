'use strict';

var vue = require('vue');

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

exports.useNamespace = useNamespace;
//# sourceMappingURL=index.js.map
