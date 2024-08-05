export const isNumber = (val: any): val is Number => {
  return typeof val === 'number'
}
export const isUndefined = (val: any): val is undefined => val === undefined
export const isString = (val: any): val is String => {
  return val && typeof val === 'string'
}
export const isStringNumber = (val: any): boolean => {
  if (isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}
