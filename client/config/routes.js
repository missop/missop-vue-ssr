
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    props: true,
    component: () => import('../views/todo/todo.vue'),
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
