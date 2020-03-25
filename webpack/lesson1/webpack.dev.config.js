// webpack的配置文件
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    // 打包入口
    mode: "development",
    entry: {
        main: './src/index.js',
    },
    // 打包输入
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: './dist/' // 静态资源serve路径，可以配置静态资源的cdn地址
    },
    devServer: {
        contentBase: './dist/',
        open: true,
        port: 8080,
        hot: true, // 开启热更新
    },
    module: {
        rules: [{
            test: /\.(png|gif|jpe?g)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash].[ext]', // 图片原始名-hash+图片类型后缀
                    limit: 10240 // 图片小于10M，生成base64, 否则直接用图片地址
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'index.html'
        }),
        new CleanWebpackPlugin(['dist']),// dist文件夹每次构建之前先删除之前构建的
        new webpack.HotModuleReplacementPlugin()]
}
