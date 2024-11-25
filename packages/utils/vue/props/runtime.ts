import { type PropType, warn } from 'vue'
import { fromPairs } from 'lodash-unified'
import { hasOwn } from '../../objects'
import { isObject } from '../../types'
import type {
  EpProp,
  EpPropFinalized,
  EpPropInput,
  EpPropMergeType,
  NativePropType,
} from './types'

export const epPropKey = '__epPropKey'
export const definePropType = <T>(val: any): PropType<T> => val
export const isEpProp = (val: unknown): val is EpProp<any, any, any> =>
  isObject(val) && !!(val as any)[epPropKey]

/**
 * @description Build prop. It can better optimize prop types
 * @description 生成 prop，能更好地优化类型
 * @example
  // limited options
  // the type will be PropType<'light' | 'dark'>
  buildProp({
    type: String,
    values: ['light', 'dark'],
  } as const)
  * @example
  // limited options and other types
  // the type will be PropType<'small' | 'large' | number>
  buildProp({
    type: [String, Number],
    values: ['small', 'large'],
    validator: (val: unknown): val is number => typeof val === 'number',
  } as const)
 */
export const buildProp = <
  Type = never,
  Value = never,
  Validator = never,
  Required extends boolean = false,
  Default extends EpPropMergeType<Type, Value, Validator> = never
>(
  prop: EpPropInput<Type, Value, Validator, Default, Required>,
  key?: string
): EpPropFinalized<Type, Value, Validator, Default, Required> => {
  if (isObject(prop) || isEpProp(prop)) return prop as any
  const { values, required, validator, type, defalut: defalutValue } = prop
  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false
          let allowedValues: unknown[] = []
          if (values) {
            allowedValues = Array.from(values)
            if (hasOwn(prop, 'default')) {
              allowedValues.push(defalutValue)
            }
            valid ||= allowedValues.includes(val)
          }
          if (validator) valid ||= validator(val)
          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)]
              .map((val) => JSON.stringify(val))
              .join(', ')
            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ''
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
                val
              )}.`
            )
          }
          return valid
        }
      : undefined
  const epProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true,
  }
  if (hasOwn(prop, 'default')) epProp.default = defalutValue
  return epProp
}

export const buildProps = <
  Props extends Record<
    string,
    | { [epPropKey: true] }
    | NativePropType
    | EpPropInput<any, any, any, any, any, any>
  >
>(
  props: Props
): {
  [K in keyof Props]: IfEpProp<
    Props[k],
    Props[k],
    IfNativePropType<Props[k], Props[k], EpPropConvert<Props[k]>>
  >
} => {
  fromPairs(
    Object.entries(props).map(([key, option]) => [
      key,
      buildProp(option as any, key),
    ])
  ) as any
}
