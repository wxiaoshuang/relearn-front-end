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
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
module.exports = merge(common, devConfig)
