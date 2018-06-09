import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.less'
import createRouter from './config/index'

Vue.use(VueRouter)

const router = createRouter()

router.beforeEach((to, from, next) => {
  console.log('beforeEach invoked')
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach invoked')
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
