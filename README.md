vue-todo基础
--
## 武器一阶：webpack的打包配置
1. webpack打包分为entry、output、module三个部分，难点主要在于module部分，最重要的是它要把
vue解析成浏览器能够识别的html展示出来，而使用vue-loader会报以下错误：(vue-loader v15版本以上)<br>
2. vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config<br>
3. 解决办法：var {VueLoaderPlugin}=require('vue-loader');plugins:new VueLoaderPlugin()<br>
4. 问题根源：webpack版本问题，webpack4.0与3，0的不同，注意：仅仅只是把webpack的版本调低并不起作用，需要整个package.json根据
旧版来进行配置<br>


## 武器二阶：webpack的本地运行配置
1. 首先在package.json中有两个命令，一个是生产环境用的：<br>
"build": "cross-env NODE_ENV=production webpack --config webpack.conf.js"<br>
一个是开发环境用的："dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.conf.js"<br>
2. 根据process.env.NODE_ENV这个变量来判断是生产环境还是开发环境，开发环境需要热加载(new webpack.HotModuleReplacementPlugin())和监听服务器<br>
3. 然后就成功地开启了页面

## 为什么要在vue中使用jsx
1. jsx是js的预处理语言,它能够实现js与html融为一体，更为简洁
2. 如何使用jsx：webpack.conf.js=>加入babel-loader=>.babelrc加入babel-plugin-transform-vue-jsx插件

## 生产环境打包分离css,js
1. 使用less-loader打包之后默认是用js添加style标签和样式内容来实现css的打包
2. 我们想要单独把css打包成一个文件=>extract-text-webpack-plugin插件
3. 生产环境和开发环境的要求不同所以需要判断之后动态地添加配置文件
4.  报错：`Module build failed: Error: No PostCSS Config found` postcss需要单独添加配置文件：
postcss.config.js
5. 将使用的库单独打包，减少浏览器的缓存速度（只需要缓存库之外的静态文件）
6. 报错:`global.less error`这是因为fallback:'style-loader',use中就不要style-loader了，主要css-loader和
less-loader
7. 处理出来的文件没有后缀：[name].[chunkHash:8).js这里少了一个]

## 小知识
1. v-for循环之后用:key来保存循环结果，这样如果相同的话会复用之前的key,避免再次循环
2. 如果没有使用vuex的话尽量把数据声明在顶层组件上面(不是app.vue,是指用到这几个数据的顶层组件)
3. 父组件响应子组件中的事件，需要子组件通过$emit传递事件以及参数，然后父组件@事件名来接收
4. Array.prototype.findIndex(callback[,this Arg]),
callback=function(element,index,array){}

## 汇总
config.entry=>config.output.filename=>config.module.rules=>config.plugins
### webpack配置问题
1. /public才能打开应用，而且router-view不显示


vue-ssr进阶
--
## 武器三阶 修改webpack配置
1. webpack的配置全部放在build文件下,
分为:<br>webpack.config.base.js:相当于common，都要引的文件<br>
webpack.config.client.js:开发环境和生产环境运行时的配置
2. 合体:webpack-merge，能够把当前写的配置和base融合起来
3. 修改文件目录：公用的组件放到todo外面，核心组件放到todo里面

## 武器四阶 vueloader配置
1. `preserveWhitespace: true,`=>vue解析时去掉空格
2. `extractCSS: isDev,`=>vue中的css单独打包
3. ` /*loaders:{
                'docs':docsLoader
            },
            preLoaders:{},
            postLoaders:{},*/`
            了解
4. client:`{
                                loader: 'css-loader',
                                options:{
                                    module:true,
                                    localIndentName: isDev ? '[hash:base64:5]' : '[path].[name].[hash:base64:5]',
                                }
                            }`<br>
vueloader:`cssModules: {
                                         localIndentName: isDev ? '[hash:base64:5]' : '[path].[name].[hash:base64:5]',
                                         camelCase: true
}`
5. `Module build failed: Error: "extract-text-webpack-plugin" loader is used without the corresponding plugin,`
<br>问题在于`options:createVueLoaderOptions(isDev)`使用vue-loader时报错

##小知识
1. ramrif每次打包删除dist
2. Do not use built-in or reserved HTML elements as component id: header
<br>组件的name属性不能设置为关键词

## 武器五阶 vue基础知识
1. Vue实例的属性(const app=new Vue())
<br>`app.$data`----声明的数据
<br>`spp.$options`----Vue实例的所有参数
<br>`app.$props`----父组件传过来的值
<br>`app.$el`----当前组件的dom
<br>`app.$watch`----监控值的变化
2. 方法
<br>`app.$forceUpdate()`----强制重新渲染
<br>`app.$set(app.obj,'a',i)`----将data中没有的a属性设置为一个响应值
<br>`app.$nextTick()`----dom更新之后
3. 生命周期
<br>`beforeCreate`----服务端渲染会调用
<br>`created`----数据操作,服务端渲染会调用
<br>`beforeMount`----dom挂载之前
<br>`mounted`----dom挂载完成，可操作dom也可数据操作
<br>`beforeUpate`
<br>`updated`
<br>`activated`----keep-alive
<br>`deactivated`
<br>`beforeDestroy`----keep-alive
<br>`destroyed`
<br>`renderError(h,err){`

`return h('div',{},err.stack)`

`}`----开发环境捕获错误
<br>`errorCaptured(){}`----线上,根组件上写可以捕获所有错误
4. computed(不要修改值)
<br>computed建议不要使用set方法,computed返回值其实使用的是get(){}
<br>computed应用场景：需要对数据进行处理之后的输出值
<br>`computed:{name:{get(){return 123},set(){}}}`
5. watch(不要修改值)
<br>watch默认第一次不会执行，声明immediate:true
<br>`watch:{firstName:handler:{},immediate:true}`
<br>deep:true=>监听本对象中所有属性以及属性中的属性(性能开销大)=>优化监听属性watch:{'obj.a':{}}
6. 原生指令
<br>v-text与v-html(显示dom节点)
<br>v-show(display:none)与v-if(增删节点，效率低下)
<br>v-for="(item,index) in arr" :key="item"
<br>增加一个key是为了增加缓存，渲染列表的时候使用同一个缓存dom，只是修改其中的值
<br>v-model、v-on、v-bind
<br>v-model.number(输入值转化为数值类型) v-model.trim  v-model.lazy(change事件)
<br>v-pre(显示源码)  v-cloak(页面直接引入库代码时html加载会闪一下代码,这个会隐藏这一点)

## Vue组件
1. 组件传参：`props:{
    active:{
        type:Boolean,
        //required:true,
        //default:true
    }
}`
2. const childVue=Vue.extend()生成子类,组件比较公用
<br>const component:{extends:component1}继承component并修改个别值
3. Vue.$parent
4. 双向绑定
<br>父组件给子组件数据，子组件input修改数据后传给父组件
5. slot插槽
<br>把组件内部的html显示出来
<br>具名slot `<slot name="header"></slot>`  
`<tag slot="header"></tag>`
<br>作用域插槽：slot-scope="value" 组件内部定义的变量(value)
6. ref <div ref="div"></div>=>this.refs.div
7. render function(组建名,{组件属性,组件内容})
<pre>
render (createElement){
    return createElement('comp-one',{
        ref:'comp'
    },
    on:{
        click:this.handleClick
    },
    nativeOn:{      //自动绑定到根节点原生dom
        click:this.handleClick
    },
    [createElement('span',{
        ref:'span',
        domProps:{
            innerHTML:123
        },
        attrs:{
            id:'test_id'
        }
    },this.value)]
    )
}</pre>
<br>有slot的时候:
<br>`this.$slots.default`或者`this.$slots.slotName`
<br>createElement是vue的虚拟dom的概念，创建的是vnode的类,
和真正的dom对比，有变化才更新

## 总结：三种方法写vue文件
1. template
<br>`<template><div></div</template>`
2. render function
<br>`render:function(createElement){return createElement()}`
3. jsx
<br>
`
render () {
         return (
           <div id="footer">
             <span>created by {this.name}</span>
           </div>
         )
       }
`

## vue-router
1. 三个文件
<br>index.js 实例化vue-router（引入路由配置routes为对象属性）
<br>小技巧:实例化的时候使用函数，每次都创建一个新的router
<br>routes.js 配置路由
<br>main.js 入口文件，引入vue-router插件(Vue.use())和配置(index.js)
2. vue-router配置项:
<br>`mode:'history`:vuerouter默认会加#，加上它就正常了
<br>`base:'/base/'`:区分页面路径和常用路径，不常用
<br>`linkActiveClass: '',linkExactActiveClass: ''`:控制全局样式名，
router-link控制的是路由跳转(app)，而a是页面跳转(网页)
<br>devServer识别路由:`historyApiFallback:{index:'/index.html'}`
<br>contentBase:指定本地加载index的目录文件夹
3. 路由路径配置项
<br>子路由：`children:[{}]`=>`<router-view>`显示
<br>`meta:{title:'aaa',description:'abc'}`:配置seo
<br>`props:true`:路由参数以props值传递(推荐)
4. 导航守卫
<br>main.js中的路由钩子
<br>beforeEach:
`router.beforeEach((to, from, next) => {
  console.log('beforeEach invoked')
  next()
})`
<br>
beforeResolve:
`router.beforeResolve((to, from, next) => {
  console.log('beforeResolve invoked')
  next()
})`
<br>
afterEach(跳转之后的)
`router.afterEach((to, from) => {
  console.log('afterEach invoked')
})`
<br>组件中的路由钩子
<br>beforeRouteEnter：想在这里修改实例上的数据必须在next回调里面用vm表示
`beforeRouteEnter (to, form, next) {
  console.log('todo before enter')
  next(vm => {
    console.log('after enter vm.id is ' + vm.id)
  })
},`
<br>
beforeRouteUpdate:路由跳转时mounted不再执行，但这个函数会执行，可修改实例
`beforeRouteUpdate (to, form, next) {
  console.log('todo route update')
  next()
},`
<br>
beforeRouteLeave:在跳转之前的确认
`beforeRouteLeave (to, form, next) {
  console.log('before route enter')
  if (global.confirm('are you sure to leave?')) {
    next()
  }
}`
5. 异步导航加载文件
<br>安装babel-plugin-syntax-dynamic-import插件
<br>路由设置组件的时候`component:()=>import ''`这样仅加载当前路由资源
6. 在地址栏后面默认加上undefined:
<br>罪魁祸首:` scrollBehavior (to, from, savedPosition) {
              },
              parseQuery () {
              },
              stringifyQuery () {
              },`
<br>其中scrollBehavior：控制跳转之后是否滚动到顶部，还是停留在当前位置
<br>另外两个则是处理查询参数的 
7. 路由参数
<br>/app/:page(page为路由参数)
<br>带路由参数的页面为什么刷新后白屏？
<br> 
8. 总结:地址栏由两个因素决定：
<br>contentBase+historyApiFallbackju决定本地服务器加载的资源所在地址 
<br>路由决定        


## vuex
1. npm i -s vuex
2. state.js=>data getters.js=>computed mutations=>methods
3. `this.$store.state.count`用$store对象来查找数据和方法显然太麻烦
<br>...mapState(['count'])
<br>先安装`npm i babel-preset-stage-1 -d`=>babelrc的presets中添加一个stage-1
4. getters=>computed 
5. mutations=>同步操作 只接受两个参数(state,{})
<br>actions=>异步操作(最终都要执行mutations) 
6. `App.vue?26cd:28 Uncaught TypeError: (0 , _vuex2.default) is not a function`<br>
`import {mapState} from 'vuex'`这里引入mapState要用对象的形式引入
7. 模块(modules)
<br>state:需要用命名空间modulesName来访问 ...mapState({textA:state=>state.modulesName.text})
<br>mutations:默认是在全局下(namespaced:true加上之后才需要属于此命名空间) ...mapMutations(['modulesName/updateText']) this['modulesName/updateText']
<br>getters:与mutations在命名空间上是一样的,接收三个参数state, getters, rootState
<br>actions:接收三个参数{ state, actions, rootState } 注意：actions的参数为对象
8. 注册模块
<br>store.registerModule('c'，{ state: { 'text': 123 } })
9. vuex的热加载
<br>输出的时候需要定义store变量
<br>
<pre>
if (module.hot) {
         module.hot.accept([
           './state/state',
           './mutations/mutations',
           './actions/actions',
           './getters/getters'
         ], () => {
           const newState = require('./state/state').default
           const newMutations = require('./mutations/mutations').default
           const newGetters = require('./getters/getters').default
           const newActions = require('./actions/actions').default
           store.hotUpdate({
             state: newState,
             mutations: newMutations,
             getters: newGetters,
             actions: newActions
           })
         })
       }
</pre>
10. 对store、actions、mutations、getters变化的监控
<br>watch:
<pre>
store.watch((state) => state.count + 1, (newCount) => {
  console.log('new count watched: ' + newCount)
})
</pre>
其他:subscribe
<pre>
store.subscribe((mutation) => {
    console.log(mutation.type)
    console.log(mutation.payload)
})
</pre>

vue知识提升（重难点）
--
## vue-ssr
#### webpack-config-server.js(配置打包)
1. target:'node'=>打包js的执行环境为nodejs
2. output:{libraryTarget:'commonjs2'}=>模块系统为module.exports和require(服务端)
3. output:{filename:'....'}=>不需要浏览器缓存，所以不使用hash值
4. devtool:'source-map'=>代码调试，提示出错在哪一行
5. externals: Object.keys(require('../package.json').dependencies)=>没必要把依赖的vue，
vuex等等单独打包出来，直接require即可，这里就是设置不打包这些文件
6. vue-server-renderer=>由于本次打包输出的是json文件，并且不包含js，使用这个插件能够
方便地操作服务端渲染
7. 由于开发环境和生产环境的不同，需要在webpack中定义`process.env.NODE_ENV`

#### server.js(报错时的处理)
1.koa框架的使用app.use(async(ctx,next)=>{})

#### dev-ssr.js(开发环境服务端渲染,处理打包出来的文件，更新打包文件)
1. 不能使用import（babel所支持的语法特别多，而node目前仅支持require）
2. memory fs与fs：memory fs不会在硬盘上写入文件
3. axios获取客户端的数据，webpack.config.client.js=>加上vue-server-renderer插件生成文件然后服务端去获取\
4. `connect ECONNREFUSED 127.0.0.1:8000`原因是没有启动客户端服务器

#### server-render.js(渲染html，插入模板)

#### create-app.js(类似于mainjs初始化vue)

#### error
1. `no components matched`=>路由设置为有参数的路径，需要把参数去掉
2. 没有根节点root，需要在模板中设置根节点，并且把模板放到root中

#### utils
1. nodemon=>自动刷新服务端代码
2. concurrently=>一次性启动两个服务

高级组件开发
--
## 1.1 notification组件复盘
### 核心问题：计算每一个实例的高度，并添加动态样式，然后控制它一定时间后消失
### 核心变量： instances(所有notice对象)、seed(notice对象的id，便于删除)
### 生成不重复的id---添加到DOM上---计算高度---定时删除元素
### 核心技能：使用js来扩展vue组件，删除组件
1. 创建vue文件作为初始文件，写一些固定的样式（后面要拿这个去extends内容）
2. 
3. 先把它注册成全局组件：
<br>notification.vue + index.js(Vue.component(name,Component)) + create-app.js(Vue.use(这里导入的是js文件))
4. did you register the component correctly? For recursive components, make sure to provide the "name" option.
<br>name属性需要和template中组件名一致
5. transition用法复习
```
 fade:transition的name属性
.fade-leave-active,
  .fade-enter-active{
        transition: all .3s;
  }
  .fade-enter,
  .fade-leave-to{
        opavity:0
  }
```
6. Vue创建组件有几种方式？
<br>new (Vue.entend())
<br>new Vue()
7. 动态的属性怎么加？
<br>:style=style
8. computed声明变量与data声明变量有何区别？
<br>响应式的差别
9. 所有用到的变量都要现在.vue中声明
10. 实例化的时候传入参数(vue中接收的props)
```
const instance = new NotificationContructor({
    propsData: options
  })
```
11. 样式的返回
```
 style() {
      return {
        position: 'fixed',
        right: '20px',
        bottom: this.verticalOffset + 'px'
      }
    }
```
12.vm.$el(这个才是dom)
```
先要生成vm，才能调用$el
instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
```
13. 解决跨域
```
headers: {'Access-Control-Allow-Origin': '*'},
```
14. 解构赋值(...要放在后面)
```
const {
    autoClose,
    ...rest
  } = options

```
15. transition的动画完成事件
```
@after-leave="afterLeave"
```
16. 删除之后高度调整不符合预期
<br>问题在于删除元素的高度获取上面，需要把dom上的offsetHeight赋值到vue对象上、
<br>transition的after-enter事件的触发：如果没有显示隐藏的变化就不会触发，所以赋值不成功（visible没有变化）

## 1.2 tab组件复盘
### 核心问题： 将tab组件插入到tabs组件中，使用插槽来显示文本,tabs上的value来决定active
### 核心技能： jsx语法，jsx中变量用大括号（注意不是双大括号）
### 核心障碍：tab栏头部内容的显示，tab栏内容区域的显示
1. tabs组件
<br>tabs里面的内容是作为插槽放进去的(this.$slots.default)
2. tab组件
<br>li中的内容也是通过获取插槽上的属性得到的
3. render func中不要写template标签，否则渲染不出来
4. 子组件访问父组件的值:this.$parent.value
<br>注意：只能访问上面一层的值，无法访问所有祖先元素，类似于$().parent()
```
tabs:provide () {
    return {
        value: this.value
    }
}
tab:inject:['value']
```
<br>provide无法响应式？
<br>
5. props不要在组件内部修
<br>改
<br>
6. 内容区域如何显示？
<br>用一个数组存储所有的插槽,tabs中读取插槽的内容放到content中去
<br>
7. slot的数据不能响应式变化
<br>它会去判断props和data是否变化来决定是否重新渲染，而插槽变化并不会导致重新渲染
<br>解决方法，把它作为组件独立出来，而不是全部都写在tabs中
<br>
8. 组件中的slots
```
render(){return (<tabs><tab/></tabs>)}
tabs:this.$slots.default=>tab的vnode对象
```


终极项目开发
--
### 服务端请求API
1. APICloud
<br>数据存储在云端数据库APICloud
2. 路由前缀
```
// 增加路由前缀
const apiRouter = new Router({prefix: '/api'})
```
3. sha1
<br>生成线上数据库签名
4. baseUrl指定
```
const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})
```
完整的url是baseURL+GET方法后面的url
5. 每一个请求都需要一个包含appId和appKey的头？
```
const getHeaders = () => {
    const now = Date.now()
    return {
      'x-APICloud-AppId': appId,
      'X-APIClod-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
```
6. 固定请求结果的格式
```
const successResponse = (data) => {
  return {
    success: true,
    data
  }
}
```
7. restlet Client测试请求
8. deleteCompleted方法
<br>批量处理，是自定义的，并没有直接用的方法
9. koa-body
<br>app.use(koaBody())这样才能把put的body中的数据添加上去
10. koa-session
<br>设置session记录登陆状态
```
app.keys = ['vue ssr tech']
app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000 //过期时间
}, app))
```
11. app.use(fn)之后fn在所有请求中都能调用

### 客户端登录API
#### login页面
<br>防止自动填充密码(input autocomplete="new-password")
#### 调试第一个api
1. client-model(封装请求方法（类似于后端）handleRequest)=>封装错误处理(util)
=>暴露第一个get请求获取todo列表
2. actions(执行请求，并将数据传递给mutations改变state)=>todo中执行这个actions
3. 由于服务端是3333端口，与客户端8000端口号不同，存在跨域问题，所以需要设置proxy
```
devServer中的配置项
proxy:{
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  },
```
#### 错误处理
1. 401错误处理（需要提示登录，并跳转至/login）
```
问题：无法找到对应的router实现跳转
解决办法：利用Vue事件机制，实例化一个vue对象并向上发送一个事件，这时在client-entry中去监听
发送事件和监听都是实例化的那个vue
bus.$on('auth', () => {
  router.push('/login')
})
```
2. 为什么login要返回一个promise对象？？？
<br>因为在请求成功之后需要执行一个跳转，相当于一个回调函数
3. request.body一直为空？？？
```
client-model中的参数没有传到post方法中
 login(username, password) {
    return handleRequest(request.post('/user/login', {username, password}))
  },
```
#### 联调所有api
1. 之前使用v-model获取input中的值，现在不行了
<br>现在这个值需要存储在store中，而store中的值不能在外部随意更改
2. 选择框的选中不能自动修改，需要通过状态来判断(点击时阻止默认事件)







