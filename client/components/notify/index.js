import Notify from './notification.vue'
import fn from './fn'

export default (Vue) => {
  Vue.component(Notify.name, Notify)
  Vue.prototype.$notify = fn
}
