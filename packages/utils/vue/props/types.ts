import type { epPropKey } from './runtime'
import type { IfNever, UnknownToNever, WritableArray } from './util'
import type { ExtractPropTypes, PropType } from 'vue'
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

/**
 * Handling default values for input (constraints)
 * If the default value is the form of an object or array, it is returned as a function to avoid interfering with data
 * 处理输入参数的默认值（约束）
 * 如果默认值是对象或者数组的形式，则以函数方式返回避免干扰数据
 */
export type EpPropInputDefault<
  Required extends boolean,
  Default
> = Required extends true
  ? never
  : Default extends Record<string, unknown> | Array<any>
  ? () => Default
  : (() => Default) | Default

/**
 * input prop `buildProp` or `buildProps` (constraints)
 *
 * prop 输入参数（约束）
 *
 * @example
 * EpPropInput<StringConstructor, 'a', never, never, true>
 * ⬇️
 * {
    type?: StringConstructor | undefined;
    required?: true | undefined;
    values?: readonly "a"[] | undefined;
    validator?: ((val: any) => boolean) | ((val: any) => val is never) | undefined;
    default?: undefined;
  }
 */
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

/**
 * output prop `buildProp` or `buildProps`.
 *
 * prop 输出参数。
 *
 * @example
 * EpProp<'a', 'b', true>
 * ⬇️
 * {
    readonly type: PropType<"a">;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly default: "b";
    __epPropKey: true;
  }
 */
export type EpProp<Type, Required, Default> = {
  readonly type: PropType<Type>
  readonly required: [Required] extends [true] ? true : false
  readonly validator: ((val: unknown) => boolean) | undefined
  [epPropKey]: true
} & IfNever<Default, unknown, { readonly default: Default }>

/**
 * Determine if it is `EpProp`
 */
export type IfEpProp<T, Y, N> = T extends { [epPropKey]: true } ? Y : N

/**
 * Finalized conversion output
 *
 * 最终转换 EpProp
 */
export type EpPropFinalized<Type, Value, Validator, Default, Required> = EpProp<
  EpPropMergeType<Type, Value, Validator>,
  UnknownToNever<Default>,
  Required
>

/**
 * Native prop types, e.g: `Function`, `StringConstructor`, `null`, `undefined`, etc.
 *
 * 原生 prop `类型，Function`、`StringConstructor`、`null`、`undefined` 等
 */
export type NativePropType =
  | ((...args: any) => any)
  | { new (...args: any): any }
  | undefined
  | null
export type IfNativePropType<T, Y, N> = [T] extends [NativePropType] ? Y : N
