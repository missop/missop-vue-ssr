const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

let config;
const devServer = {
  port: '8000',
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  headers: {'Access-Control-Allow-Origin': '*'},
  historyApiFallback: {
    index: '/public/index.html'
  },
  proxy:{
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  },
  hot: true
}

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_DEV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin()
]

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
       /* {
          test: /\.(vue|js|jsx)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          /!*在文件加载之前进行预处理*!/
          enforce: 'pre'
        },*/
        {
          test: /\.less$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'less-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat(
      [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ]
    )
  })
} else {
  config = merge(baseConfig, {
    // 修改入口文件把库分离出去
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkHash:8].js',
      publicPath: '/public/'
    },
    // 把less处理成单独文件
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'less-loader'
            ]
          })
        }
      ]
    },
    // 处理css与js的hashd的插件
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      //将name为vendor声明的包单独打包出来
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      //vendor放在runtime前面,将webpack单独打包,
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
