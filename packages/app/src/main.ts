import Vue from 'vue'

import router from '@/router'
import VueCompositionAPI from '@vue/composition-api'
import { createPinia, PiniaVuePlugin } from 'pinia'

import vuetify from '@/plugins/vuetify'

import App from '@/App.vue'

Vue.use(VueCompositionAPI)
Vue.use(PiniaVuePlugin)

const pinia = createPinia()

const app = new Vue({
  render: h => h(App),
  router,
  pinia,
  vuetify,
})

app.$mount('#app')
