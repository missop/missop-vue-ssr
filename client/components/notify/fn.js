import Vue from 'vue'
import notifyExtends from './notify-extends'

const NotificationContructor = Vue.extend(notifyExtends)

const instances = []
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  let len = instances.length
  const index = instances.findIndex(inst => inst.id = instance.id)

  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height
  console.log('remove:'+removeHeight)
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset  = parseInt(instances[i].verticalOffset) -removeHeight - 16
  }
}

const notify = (options) => {
  if (Vue.prototype.$isServer) return
  const {
    autoClose,
    ...rest
  } = options

  const instance = new NotificationContructor({
    propsData: {
      ...rest
    },
    data() {
      return {
        autoClose: autoClose === undefined ? 3000 : autoClose
      }
    }
  })

  let id = `notification-${seed++}`
  instance.id = id

  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)

  let verticalOffset = 0
  instances.forEach(function (item) {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  console.log(verticalOffset)
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  instance.vm.visible = true

  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })

  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
