// webpack的配置文件
const path = require('path')
module.exports = {
    // 打包入口
    mode:"development",
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    }
}
