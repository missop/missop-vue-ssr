<script>
  export default {
    name: 'tab',
    props: {
      index: {
        type: [Number, String],
        required: true
      },
      label: {
        type: String,
        default: 'tab'
      }
    },
    mounted () {
      this.$parent.tabsItem.push(this)
    },
    computed: {
      active () {
        return this.$parent.value === this.index
      }
    },
    render () {
      const tab = this.$slots.label || <span>{this.label}</span>
      const classNames = {
        tab: true,
        active: this.active
      }
      return (
        <li class={classNames} on-click={this.handleClick}>
          {tab}
        </li>
      )
    },
    methods: {
      handleClick () {
        this.$parent.onChange(this.index)
      }
    }
  }
</script>

<style lang="less" scoped>
  .tab {
    list-style: none;
    line-height: 40px;
    margin-right: 30px;
    position: relative;
    bottom: -2px;
    cursor: pointer;
    &.active{
      border-bottom:2px solid blue;
      color: red;
    }
    &:last-child{
      margin-right: 0;
    }
  }
</style>

