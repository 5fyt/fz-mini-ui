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

export { isNumber, isString, isStringNumber, isUndefined };
//# sourceMappingURL=types.mjs.map
