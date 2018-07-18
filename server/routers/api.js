const Router = require('koa-router')

// 增加路由前缀
const apiRouter = new Router({prefix: '/api'})

const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter.get('/todo', async (ctx) => {
  const todos = await ctx.db.getAllTodos()
  ctx.body = successResponse(todos)
})

module.exports = apiRouter
