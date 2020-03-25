// webpack的配置文件
const path = require('path')
module.exports = {
    // 打包入口
    mode: "production",
    entry: {
        main: './src/index.js',
    },
    // 打包输入
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: './dist/' // 静态资源serve路径，可以配置静态资源的cdn地址
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
    }
}
