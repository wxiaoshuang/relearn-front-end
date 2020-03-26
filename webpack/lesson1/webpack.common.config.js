// webpack的配置文件
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
module.exports = {
    // 打包入口
    entry: {
        main: './src/index.js',
    },
    // 打包输入
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', // [name] = 'main' // 入口文件打包
        chunkFilename:'[name].chunk.js' // 非入口文件生成的chunk  vendors~lodash.chunk.js
        // output里面的publicPath表示的是打包生成的index.html文件里面引用资源的前缀；可以配置静态资源的cdn地址
        // 访问项目要用localhost:8080/public，使用localhost:8080/访问不到
        // publicPath: '/public/'
    },
    optimization: {


        // 代码分割
        splitChunks: {
            chunks: 'all', // async(异步导入) initial(同步导入) all(所有同步和异步)三种选项
            minSize: 30000, // 30kb 在压缩之前
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            // 分组
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                common: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        // runtimeChunk: 'runtime'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: '/src/',
                use: [{
                    loader: 'babel-loader',// babel和webpack沟通的桥梁
                    options: {
                        presets: [['@babel/preset-env', {
                            modules: false, // 禁止Babel将ES6编译到CommonJS,否则无法开启tree shaking
                            useBuiltIns: 'usage' // 只polyfill使用的部分
                        }]]
                    }
                }]
            },
            // 字体文件处理
            {
                test: /\.(ttf|svg|eot)$/,
                use: 'file-loader'
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash].[ext]', // 占位符： 图片原始名-hash+图片类型后缀
                        limit: 102400, // 图片小于100kB，生成base64, 否则直接用图片地址
                        outputPath: 'images/', // 将图片单独打包到dist下的images文件夹里面
                    }
                }]
            }
        ]
    },
    plugins:
        [
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new CleanWebpackPlugin(),// 每次构建之前先删除dist文件夹
        ]
}
