<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs :value="filter" @changeValue="activate">
        <tab :index="tab" :label="tab" :key="tab"
             v-for="tab in states"/>
      </tabs>
    </div>
    <input type="text"
           class="add-input"
           autofocus="autofocus"
           placeholder="接下去要做什么？"
           @keyup.enter="addTodo">
    <Item
      v-for="todo in filteredTodos"
      :todo="todo"
      :key="todo.id"
      @del="deleteTodo"/>
    <Helper :itemsLeft="filteredTodos.length"
            @clear="clearCompleted">
    </Helper>
    <!--<router-view/>-->
  </section>
</template>

<script>
  import Helper from './helper.vue'
  import Item from './item.vue'
  import {mapActions} from 'vuex'

  let id = 0
  export default {
    beforeRouteEnter(to, form, next) {
      console.log('todo before enter')
      next(vm => {
        console.log('beforeRouteEnter vm.page is ' + vm.page)
      })
    },
    beforeRouteUpdate(to, form, next) {
      console.log('todo route update')
      next()
    },
    beforeRouteLeave(to, form, next) {
      console.log('before route enter')
      if (global.confirm('are you sure to leave?')) {
        next()
      }
    },
    props: [
      'page'
    ],
    data() {
      return {
        todos: [],
        filter: 'All',
        states: [
          'All',
          'active',
          'completed'
        ]
      }
    },
    mounted() {
      console.log(this.id)
      this.fetchTodos()
    },
    computed: {
      filteredTodos() {
        if (this.filter === 'All') {
          return this.todos
        } else if (this.filter === 'completed') {
          return this.todos.filter(todo => todo.completed)
        } else {
          return this.todos.filter(todo => todo.activated)
        }
      }
    },
    methods: {
      ...mapActions(['fetchTodos']),
      addTodo(e) {
        const content = e.target.value.trim()
        if (!content) {
          return
        }
        this.todos.unshift({
          id: id++,
          content: content,
          completed: false
        })
        e.target.value = ''
      },
      deleteTodo(id) {
        this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
      },
      getFilter(filter) {
        console.log(filter)
        this.filter = filter
      },
      clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed)
      },
      activate(value) {
        this.filter = value
      }
    },
    components: {
      Helper,
      Item
    }
  }
</script>

<style scoped lang="less">
  .real-app {
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
  }

  .add-input {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }

  .tab-container {
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
    background-color: #fff;
  }
</style>
