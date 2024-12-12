import './assets/main.css'
import { VueQueryPlugin } from '@tanstack/vue-query'

import { createApp } from 'vue'
import App from './App.vue'

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
}

const app = createApp(App)
app.use(VueQueryPlugin, vueQueryPluginOptions)
// app.use(VueQueryPlugin)
app.mount('#app')
