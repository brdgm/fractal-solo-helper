import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import router from './router'
import i18n from './i18n'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import IconGlobResolver from './util/IconGlobResolver'

const pinia = createPinia()
  .use(piniaPluginPersistedState)

IconGlobResolver.createResolved().then(resolver => {
  createApp(App)
    .use(pinia)
    .use(router)
    .use(i18n)
    .provide('iconGlobResolver', resolver)
    .mount('#app')  
})
