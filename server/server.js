const Koa = require('koa')

const app = new Koa()
const path = require('path')
const send = require('koa-send')
const koaBody = require('koa-body')
const koaSession = require('koa-session')

const staticRouter = require('./routers/static')

const apiRouter = require('./routers/api')
const createDb = require('./db/db')
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)
const userRouter = require('./routers/user')

app.keys = ['vue ssr tech']
app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000
}, app))

const isDev = process.env.NODE_DEV === 'development'
console.log(process.env.NODE_DEV)

app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (e) {
    console.log(e)
    ctx.status = 500
    if (isDev) {
      ctx.body = e.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')})
  } else {
    await next()
  }
})

app.use(koaBody())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter
// isDev==false导致直接引入打包后的文件
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`);
})
