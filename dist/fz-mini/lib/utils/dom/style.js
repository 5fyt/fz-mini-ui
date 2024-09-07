'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var types = require('../types.js');

const addUnit = (value, defaultUnit = "px") => {
  if (!value)
    return;
  if (types.isNumber(value) || types.isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (types.isString(value)) {
    return value;
  }
};

exports.addUnit = addUnit;
//# sourceMappingURL=style.js.map
