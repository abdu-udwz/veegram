import Vue from 'vue'
import VueRouter from 'vue-router'
import router from '@/router'
import VueCompositionAPI from '@vue/composition-api'
import { createPinia, PiniaVuePlugin } from 'pinia'

import vuetify from '@/plugins/vuetify'

import App from '@/App.vue'

Vue.use(VueCompositionAPI)
Vue.use(PiniaVuePlugin)
// it is important to register router plugin after pinia
// https://github.com/vuejs/pinia/discussions/723#discussioncomment-2110660
Vue.use(VueRouter)

const pinia = createPinia()


const app = new Vue({
  render: h => h(App),
  pinia,
  router,
  vuetify,
})


app.$mount('#app')
console.log('app mounted now')
