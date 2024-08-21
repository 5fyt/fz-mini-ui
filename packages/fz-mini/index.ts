import { INSTALLED_KEY } from '@fz-mini/constants'
import components from './component'

const FzMini = {
  install(app: any) {
    if (app[INSTALLED_KEY]) return
    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))
  },
}
export default FzMini
