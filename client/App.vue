<template>
    <div id="app">
        <div id="cover"></div>
        <v-header></v-header>
        <Todo></Todo>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import vHeader from './layout/header.vue'
import vFooter from './layout/footer.jsx'
    import Todo from './views/todo/todo.vue'
    export default {
      components: {
        vHeader,
        vFooter,
        Todo
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
</style>
