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
      return (
        <div class="tabs-content">
        </div>
      )
    }
  }
</script>
