import Notify from './notification.vue'

export default {
  extends: Notify,
  computed: {
    style() {
      return {
        position: 'fixed',
        right: '20px',
        bottom: this.verticalOffset + 'px'
      }
    }
  },
  mounted() {
    this.createTimer()
    console.log(this.height)
  },
  methods: {
    createTimer() {
      if(this.autoClose){
        this.timer = setTimeout(() => {
          this.visible = false
        },this.autoClose)
      }
    },
    afterEnter() {
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestory() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  data() {
    return {
      verticalOffset: 0,
      timer: null,
      autoClose: 3000,
      visible: false
    }
  }
}
