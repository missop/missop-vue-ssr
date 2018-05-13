const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV == 'development'


const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/main.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]

            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_DEV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if (isDev) {
    config.module.rules.push({
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'less-loader'
        ]
    });
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: '8000',
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    // 修改入口文件把库分离出去
    config.entry={
        app:path.join(__dirname,'src/main.js'),
        vendor:['vue']
    }
    config.output.filename='[name].[chunkHash:8].js'
    // 把less处理成单独文件
    config.module.rules.push({
        test: /\.less$/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
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
    });
    // 处理css与js的hashd的插件
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        //将name为vendor声明的包单独打包出来
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'
        }),
        //vendor放在runtime前面,将webpack单独打包,
        new webpack.optimize.CommonsChunkPlugin({
            name:'runtime'
        })
    )

}

module.exports = config
