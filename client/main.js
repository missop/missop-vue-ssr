import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.less'
import createRouter from './config/index'

Vue.use(VueRouter)

const router = createRouter()

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
