<script>
  export default {
    name: 'tab-container',
    props: {
      tabsItem: {
        type: Array,
        required: true
      }
    },
    render () {
      let contents = this.tabsItem.map(item => {
        return item.active ? item.$slots.default : null
      })
      return (
        <div class="tabs-content">
          {contents}
        </div>
      )
    }
  }
</script>
