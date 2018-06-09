
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    props: true,
    components: {
      default: () => import('../views/todo/todo.vue')
    },
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'all app'
    },
    beforeEnter (to, from, next) {
      console.log('beforeEnter invoked')
      next()
    }
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]
