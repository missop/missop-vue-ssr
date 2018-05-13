##武器一阶：webpack的打包配置
1. webpack打包分为entry、output、module三个部分，难点主要在于module部分，最重要的是它要把
vue解析成浏览器能够识别的html展示出来，而使用vue-loader会报以下错误：<br>
2. vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config<br>
3. 解决办法：var {VueLoaderPlugin}=require('vue-loader');plugins:new VueLoaderPlugin()<br>
4. 问题根源：webpack版本问题，webpack4.0与3，0的不同，注意：仅仅只是把webpack的版本调低并不起作用，需要整个package.json根据
旧版来进行配置<br>


##武器二阶：webpack的本地运行配置
1. 首先在package.json中有两个命令，一个是生产环境用的：<br>
"build": "cross-env NODE_ENV=production webpack --config webpack.conf.js"<br>
一个是开发环境用的："dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.conf.js"<br>
2. 根据process.env.NODE_ENV这个变量来判断是生产环境还是开发环境，开发环境需要热加载(new webpack.HotModuleReplacementPlugin())和监听服务器<br>
3. 然后就成功地开启了页面

##为什么要在vue中使用jsx
1. jsx是js的预处理语言,它能够实现js与html融为一体，更为简洁
2. 如何使用jsx：webpack.conf.js=>加入babel-loader=>.babelrc加入babel-plugin-transform-vue-jsx插件

##小知识
1. v-for循环之后用:key来保存循环结果，这样如果相同的话会复用之前的key,避免再次循环
2. 如果没有使用vuex的话尽量把数据声明在顶层组件上面(不是app.vue,是指用到这几个数据的顶层组件)
3. 父组件响应子组件中的事件，需要子组件通过$emit传递事件以及参数，然后父组件@事件名来接收
4. Array.prototype.findIndex(callback[,this Arg]),
callback=function(element,index,array){}
