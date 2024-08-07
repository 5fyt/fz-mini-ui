import { definePropType } from '@fz-mini/utils'
import type { ExtractPropTypes } from 'vue'
import type Icon from './icon.vue'
export const iconProps = {
  /**
   * @description icon 尺寸大小
   */
  size: {
    type: definePropType<string | number>([String, Number]),
  },
  /**
   * @description icon 颜色 svg的填充色
   */
  color: {
    type: String,
  },
} as const
//icon props类型
export type IconProps = ExtractPropTypes<typeof iconProps>
//icon组件 实例类型
export type IconInstance = InstanceType<typeof Icon>
