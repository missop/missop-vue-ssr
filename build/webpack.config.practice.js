const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

const isDev = process.env.NODE_ENV == 'development'

let config;
const devServer = {
    port: '8080',
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    hot: true
}

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_DEV: '"development"'
        }
    }),
    new HTMLPlugin({
        template: path.join(__dirname, '../practice/test.html')
    })
]


if (isDev) {
    config = merge(baseConfig, {
        entry: path.join(__dirname, '../practice/instance/index.js'),
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [
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
        resolve: {
            // runtime的区别是是否能够在vue对象中写template
            alias: {
                'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
            }
        },
        plugins: defaultPlugins.concat(
            [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
        )
    })
}

module.exports = config
