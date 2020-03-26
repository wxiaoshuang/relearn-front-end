// webpack的配置文件
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
module.exports = {
    // 打包入口
    mode: "development",
    devtool : 'eval-cheap-module-source-map', // 配置sourceMap
    // devtool: '',
    entry: {
        main: './src/index.js',
    },
    // 打包输入
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', // [name] = 'main'
        // output里面的publicPath表示的是打包生成的index.html文件里面引用资源的前缀；可以配置静态资源的cdn地址
        // 访问项目要用localhost:8080/public，使用localhost:8080/访问不到
        publicPath: '/public/'
    },
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
            },
            {
                test: /\.css$/,
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
        // }, {
        //     test: /\.less$/,
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
        //         'less-loader'
        //     ]
        // },
        // {
        //     test: /\.styl$/,
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
        //         'stylus-loader'
        //     ]
        // }]
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'index.html'
        }),
        new CleanWebpackPlugin(),// 每次构建之前先删除dist文件夹
        new webpack.HotModuleReplacementPlugin()
    ]
}
