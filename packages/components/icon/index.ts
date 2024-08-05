import { withInstall } from '@fz-mini/utils'
import Icon from './src/icon.vue'

export const FzIcon = withInstall(Icon)
export default FzIcon
export * from './src/icon'
// 这里添加的类型，可以在模板里面被解析
declare module 'vue' {
  export interface GlobalComponents {
    // 我们的接口可以自动合并
    FzIcon: typeof FzIcon
  }
}
