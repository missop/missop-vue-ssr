const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  //context是传入到vueserverrenderer里面去的
  const context = {url: ctx.path}

  try {
    const appString = await renderer.renderToString(context)

    const { title } = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title:title.text()
    })
    ctx.body = html
  } catch (e) {
    console.log('render error', e)
    throw e
  }
}
