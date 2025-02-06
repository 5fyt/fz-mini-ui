import { buildProps, definePropType, iconPropType } from '@fz-mini/utils'
import type { ExtractPropTypes } from 'vue'
export const inputProps = buildProps({
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: definePropType<string | number | null | undefined>([
      String,
      Number,
      Object,
    ]),
    default: '',
  },
  maxlength: {
    type: [String, Number],
  },
  minlength: {
    type: [String, Number],
  },
  /**
   * @description native input readonly
   */
  clearable: Boolean,
  /**
   * @description toggleable password input
   */
  showPassword: Boolean,
  /**
   * @description word count
   */
  showWordLimit: Boolean,

  prefixIcon: {
    type: iconPropType,
  },
  suffixIcon: {
    type: iconPropType,
  },
} as const)
export type InputProps = ExtractPropTypes<typeof inputProps>
