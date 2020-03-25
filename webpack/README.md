source: 从基础到实战 手把手带你掌握新版Webpack4.0
进度：
# webpack 4
## webpack究竟是什么?
webpack是一个模块打包器，支持commonjs, ES6 module, AMD, CMD等多种模块
用webpack打包需要安装webpack和webpack-cli两个包
```markdown
mkdir lesson1
npm init -y
npm install webpack webpack-cli -D
```
## loaders是什么
webpack只可以打包js模块，css, 图片这些不知道怎么打包

图片打包需要使用两个loader: url-loader和file-loader

> file-loader 返回的是图片的url
> url-loader可以将图片转为base64字符串，能更快的加载图片，一旦图片过大，
 就需要使用file-loader加载本地图片，故url-loader可以设置图片超过多少字节时，使用file-loader加载图片。
## plugins是什么
