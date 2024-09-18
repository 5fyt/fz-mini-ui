import { isNumber, isStringNumber, isString } from '../types.mjs';

const addUnit = (value, defaultUnit = "px") => {
  if (!value) return;
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
};

export { addUnit };
//# sourceMappingURL=style.mjs.map
