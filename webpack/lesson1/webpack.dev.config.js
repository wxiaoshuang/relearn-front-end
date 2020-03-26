// webpack的配置文件
const merge = require('webpack-merge')
const common = require('./webpack.common.config')
const webpack = require('webpack')
const devConfig = {
    mode: "development",
    devtool: 'eval-cheap-module-source-map', // 配置sourceMap
    // 开启一个服务器, 监听文件变化
    devServer: {
        // 告诉服务器从哪里提供内容。
        contentBase: './dist',
        // 一般情况下要保证devServer中的publicPath与output.publicPath保持一致,
        // 如果不设置devServer中的publicPath，那么取output.publicPath
        // publicPath: '/public/',
        open: true, // 启动devServer自动打开浏览器
        port: 8080, //开启服务器运行端口
        hot: true, // 开启热更新
        proxy: {
            '/api': 'http//localhost:3000/'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                sideEffects: true, // import的css文件不tree shaking
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true, // 开启css的模块化
                            importLoaders: 1 // 用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    }]
            },
            // {
            //     test: /\.scss$/,
            // sideEffects: true, // import的scss文件不tree shaking
            //     use: [
            //         'style-loader',
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 importLoaders: 2
            //             }
            //         },
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 plugins: [require('autoprefixer')]
            //             }
            //         },
            //         'sass-loader'
            //     ]
            // }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
module.exports = merge(common, devConfig)
