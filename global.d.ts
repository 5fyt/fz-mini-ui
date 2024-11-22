declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FzIcon: typeof import('@fz-mini/components')['FzIcon']
  }
}
