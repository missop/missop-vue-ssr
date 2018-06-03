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



