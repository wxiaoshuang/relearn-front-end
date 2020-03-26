// webpack的配置文件
const merge = require('webpack-merge')
const common = require('./webpack.common.config')
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = merge(common, {
    mode: "production", // 生产模式默认开启代码压缩，混淆和tree shaking
    // devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].chunk.js'
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],// 重写minimizer，默认只压缩js
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                sideEffects: true, // import的css文件不tree shaking
                use: [
                    MiniCssExtractPlugin.loader,
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
            //     sideEffects: true, // import的scss文件不tree shaking
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[contenthash].css',
            chunkFilename: '[name].[contenthash].chunk.css',
        }),
    ],
})
