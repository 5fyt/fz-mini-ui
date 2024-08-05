import { createApp } from 'vue'
import '@fz-mini/theme-chalk/src/index.scss'
import App from './App.vue'
import { FzIcon } from '@fz-mini/components'
const plugins = [FzIcon]
const app = createApp(App)

plugins.forEach((plugin) => {
  app.use(plugin)
})
app.mount('#app')
