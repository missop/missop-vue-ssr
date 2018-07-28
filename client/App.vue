<template>
  <div id="app">
    <div id="cover"></div>
    <div id="loading" v-show="loading">
      <loading></loading>
    </div>
    <v-header></v-header>
    <router-view/>
    <button @click="addNotice" class="botice-btn">add notice</button>
    <!--<notify notice="emergency"/>-->
    <v-footer></v-footer>
  </div>
</template>

<script>
  import vHeader from './layout/header.vue'
  import vFooter from './layout/footer.jsx'
  import loading from './components/loading/loading.vue'
  import {mapState} from 'vuex'

  export default {
    metaInfo: {
      title: 'Todo App'
    },
    components: {
      vHeader,
      vFooter,
      loading
    },
    mounted() {
      /* this.$store.dispatch('updateCountAsync', 'bns')
        // this['a/updateText']('123')
        // this['a/add']() */
    },
    methods: {
      addNotice() {
        this.$notify({
          content: 'test $notify',
          btn: 'close'
        })
      }
      // ...mapMutations(['a/updateText']),
      // ...mapActions(['a/add'])
    },
    computed: {
      /* ...mapState({
        counter: (state) => state.count
        // textA: state => state.a.text,
        // test: state => state.a.aChild.test
      }),
      ...mapGetters({
        // newTextA: ['a/newTextA'],
        // newTest: ['a/aChild/newTest']
      }), */
      ...mapState(['loading']),
      fullName() {
        return this.$store.getters.fullName
      }
    }
  }
</script>

<style scoped lang="less">
  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  #cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    opacity: .9;
    z-index: -1;
  }

  #loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, .3);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
