// webpack的配置文件
const merge = require('webpack-merge')
const common = require('./webpack.common.config')
module.exports = merge(common, {
    mode: "production", // 生产模式默认开启代码压缩，混淆和tree shaking
    devtool:'cheap-module-source-map',
})
