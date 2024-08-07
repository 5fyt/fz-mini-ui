import type FzIcon from '@fz-mini/components/icon'
import '@vue/runtime-core'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FzIcon: typeof FzIcon
  }
}
