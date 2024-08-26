import type { INSTALLED_KEY } from '@element-plus/constants'
declare global {
  const process: {
    env: {
      NOOD_ENV: string
    }
  }
}
declare module '@vue/runtime-core' {
  export interface App {
    [INSTALLED_KEY]?: boolean
  }
}
export {}
