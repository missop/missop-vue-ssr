const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
console.log('c');
//指定输出目录在memoryfs中
serverCompiler.outputFileSystem = mfs

let bundle
//监控打包文件的变化，自动更新
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  //eslint的错误或者其他错误不会在err中,会在stats中出现
  stats.errors.forEach(err => console.warn(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  //看到new bundle generated这一条的时候vue-ssr-server-bundle.json这个文件应该已经生成
  console.log('new bundle generated');
})

//
const handleSSR = async(ctx) => {
  //上面的打包没有完成的时候浏览器会报错
  if (!bundle) {
    ctx.body = '稍等再看看~~~~'
    return
  }

  //由于有两个服务器，需要用axios请求去获取另外一个服务器的数据
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
    )

  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })
  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
