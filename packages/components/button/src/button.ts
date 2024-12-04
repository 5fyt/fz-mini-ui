import { Loading } from '@element-plus/icons-vue'
import { useSizeProp } from '@fz-mini/hooks'
import { buildProps, definePropType, iconPropType } from '@fz-mini/utils'
import type { Component, ExtractPropTypes } from 'vue'
export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'danger',
  'info',
  '',
] as const

export const buttonNativeTypes = ['button', 'submit', 'reset'] as const
export const buttonProps = buildProps({
  /**
   * @description button size
   */
  size: useSizeProp,
  /**
   * @description button type
   */
  type: {
    type: String,
    vales: buttonTypes,
    default: '',
  },
  /**
   * @description icon component
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description customize loading icon component
   */
  loadingIcon: {
    type: iconPropType,
    default: () => Loading,
  },
  /**
   * @description native button type
   */
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: 'button',
  },
  /**
   * @description custom element tag
   */
  tag: {
    type: definePropType<string | Component>([String, Object]),
    default: 'button',
  },
  /**
   * @description automatically insert a space between two Chinese characters
   */
  autoInsertSpace: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description disable the button
   */
  disabled: Boolean,
  /**
   * @description determine whether it's loading
   */
  loading: Boolean,
  /**
   * @description determine whether it's plain button
   */
  plain: Boolean,
  /**
   * @description determine whether it's circle button
   */
  circle: Boolean,
  /**
   * @description determine whether it's round button
   */
  round: Boolean,
  /**
   * @description determine whether it's text button
   */
  text: Boolean,
  /**
   * @description determine  whether a text button background color is always on
   */
  bg: Boolean,
  /**
   * @description determine whether it's link button
   */
  link: Boolean,
  /**
   * @description native button autofocus
   */
  autofocus: Boolean,
  /**
   * @description custom button color ,automatically calculate `hover` and `active` color
   */
  color: String,
} as const)

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

export type ButtonType = ButtonProps['type']
export type ButtonNativeTypes = ButtonProps['nativeType']
