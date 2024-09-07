'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.isNumber = isNumber;
exports.isString = isString;
exports.isStringNumber = isStringNumber;
exports.isUndefined = isUndefined;
//# sourceMappingURL=types.js.map
