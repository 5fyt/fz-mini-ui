import { isNumber, isString, isStringNumber } from '../types'

//生成带有px单位的字符串
export const addUnit = (value: string | number, defaultUnit = 'px') => {
  if (!value) return
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`
  } else if (isString(value)) {
    return value
  }
}
