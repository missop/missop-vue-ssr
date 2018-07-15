<script type="text/jsx">
  import TabContainer from './tab-container.vue'
  export default {
    name: "tabs",
    components: {TabContainer},
    props: {
      //控制显示哪一个tab
      value: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        tabsItem: []
      }
    },
    mounted() {
      console.log(this.$slots.default)
    },
    render() {
      return (
        <div class="tabs">
          <ul class="tabs-header">
            {this.$slots.default}
          </ul>
          <tab-container tabsItem={this.tabsItem}/>
        </div>
      )
    },
    methods: {
      onChange (index) {
        this.$emit('changeValue', index)
      }
    }
  }
</script>

<style scoped>
  .tabs-header {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 2px solid #ededed;
  }

</style>
