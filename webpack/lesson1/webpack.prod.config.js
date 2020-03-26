// webpack的配置文件
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    // 打包入口
    mode: "production",

    entry: {
        main: './src/index.js',
    },
    // 打包输入
    output: {
        // 输出路径
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', // 输出文件名称
        // publicPath: 'www.cdn.cn' // 静态资源serve路径，可以配置静态资源的cdn地址
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     include: './src/',
            //     use: [{
            //         loader:'babel-loader',// babel和webpack沟通的桥梁
            //         options: {
            //             presets: [['@babel/preset-env', {
            //                 useBuiltIns: 'usage' // 只polyfill使用的高级特性
            //             }]]
            //         }
            //     }]
            // },
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
            // }
            ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // 打包结束后，在dist文件夹下生成index.html,将js引入到index.html中
        }),
        new CleanWebpackPlugin() // dist文件夹每次构建之前先删除之前构建的]
    ]
}
