##武器一阶：webpack的打包配置
>webpack打包分为entry、output、module三个部分，难点主要在于module部分，最重要的是它要把
vue解析成浏览器能够识别的html展示出来，而使用vue-loader会报以下错误：
>vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config
>解决办法：var {VueLoaderPlugin}=require('vue-loader');plugins:new VueLoaderPlugin()
>问题根源：webpack版本问题，webpack4.0与3，0的不同，注意：仅仅只是把webpack的版本调低并不起作用，需要整个package.json根据
旧版来进行配置


##武器二阶：webpack的本地运行配置
>
