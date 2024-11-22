import type { IfNever, UnknownToNever, WritableArray } from './util'
import type { ExtractPropTypes } from 'vue'
/**
 * Extract all value types from object type T
 *
 * 提取对象类型 T 的所有值类型
 * @example
 * Value<{a: string; b: number; c: boolean}> => string | number | boolean
 * Value< x: { y: number; z: string }; w: boolean> => { y: number; z: string } | boolean
 */
export type Value<T> = T[keyof T]

/**
 * Extract the type of a single prop
 *
 * 提取单个 prop 的参数类型
 * @example
 * ExtractPropType<{ type: StringConstructor; required:true }> => { key: string } => string
 * ExtractPropType<{ type: StringConstructor }> => { key: string | undefined } => string | undefined
 * ExtractPropType<{ name: StringConstructor; age: { type: NumberConstructor; required: true }> =>{ key: { name?: string , age: number }} => { name?: string, age：number}
 */

export type ExtractPropType<T extends object> = Value<
  ExtractPropTypes<{ key: T }>
>

/**
 *  Handle the type of prop by converting the type T into a writable and required type.
 *
 * 处理 prop 的类型，将 T 类型转换成可写和必填类型
 * @example
 * ResolvePropType<StringConstructor> => string
 * ResolvePropType<BooleanConstructor> => boolean
 * ResolvePropType<PropType<T>> => T
 */
export type ResolvePropType<T> = IfNever<
  T,
  never,
  ExtractPropType<{ type: WritableArray<T>; required: true }>
>

/**
 * The final type of prop after merging the type, required, default value, and validator.
 *
 * 合并类型、是否必填、默认值和验证器后的最终 prop 类型
 * 优先使用 values 的类型（Value）。如果没有 values，则使用 type 推断类型。如果 type 无法推断（例如 never），则使用 validator 推断类型
 * @example
 * EpPropMergeType<StringConstructor, 'a' | 'b', number> => "a" | "b" | number
 */
export type EpPropMergeType<Type, Value, Validator> =
  | IfNever<UnknownToNever<Value>, ResolvePropType<Type>, never>
  | UnknownToNever<Value>
  | UnknownToNever<Validator>

export type EpPropInputDefault<
  Required extends boolean,
  Default
> = Required extends true
  ? never
  : Default extends Record<string, unknown> | Array<any>
  ? () => Default
  : (() => Default) | Default

export type EpPropInput<
  Type,
  Values,
  Validator,
  Default,
  Required extends boolean
> = {
  type?: Type
  required?: Required
  values?: Values
  validator?: ((val: any) => val is Validator) | ((val: any) => boolean)
  defalut?: EpPropInputDefault<Required, Default>
}
