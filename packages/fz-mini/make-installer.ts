import { INSTALLED_KEY } from '@fz-mini/constants'
import { version } from './version'
import type { App, Plugin } from '@vue/runtime-core'
export const makeInstaller = (components: Plugin[]) => {
  const install = (app: App) => {
    if ((app as any)[INSTALLED_KEY]) return
    ;(app as any)[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))
  }
  return { install, version }
}
