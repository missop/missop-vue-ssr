import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import createStore from './store/store'

import './assets/styles/global.less'
import createRouter from './config/index'

Vue.use(VueRouter)

const router = createRouter()
const store = createStore()
store.registerModule('c', {
  state: {
    text: 3
  }
})

// store.watch((state) => state.count + 1, (newCount) => {
//   console.log('new count watched: ' + newCount)
// })

store.subscribe((mutation) => {
  // console.log(mutation.type)
  // console.log(mutation.payload)
})

store.subscribeAction((action) => {
  // console.log(action.type)
  // console.log(action.payload)
})

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
  store,
  render: (h) => h(App)
}).$mount('#root')
