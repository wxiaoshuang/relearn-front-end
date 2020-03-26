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
## loaders
webpack只可以打包js模块，css, 图片这些不知道怎么打包
loader的执行顺序从右到左

### 处理图片
图片打包需要使用两个loader: url-loader和file-loader
```javascript
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
```
> file-loader生成Data URL, 并且将文件复制到输出目录
> url-loader可以将图片转为base64字符串，能更快的加载图片，一旦图片过大，
  就需要使用file-loader加载本地图片，故url-loader可以设置图片超过多少字节时，使用file-loader生成Data URL
> 因此两个包都要安装
### 处理css
css需要三个loader, postcss-loader, css-loader, style-loader

postcss-loader添加浏览器厂商前缀
css-loader将引入的css打包成一个css文件
style-loader生成style标签，以内联的形式将css插入到html中


在rules添加css配置
```markdown
 {
     test: /\.css$/,
     use: [
         'style-loader',
         {
             loader: 'css-loader',
             options: {
                 modules: true, // css模块化
                 importLoaders: 1 // 在css中使用@import语法，引入的css文件也需要英国postcss-loader的处理
             }
         },
         {
             loader: 'postcss-loader',
             options: {
                 plugins: [require('autoprefixer')]
             }
         }]
 }
```
### sass处理
安装node-sass和sass-loader
```markdown
 {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    },
                    'sass-loader'
                ]
}
```


### 引入babel转译ES6语法
`npm install babel-loader @babel/core @babel/preset-env @babel/polyfill`
babel和webpack沟通的桥梁
@babel/preset-env只可以解析ES6的语法，比如箭头函数，let, const, 

但是Promise对象，数组新增的方法includes等方法都没有，所以还需要引入@babel/polyfill

@babel/polyfill比较大，我们只polyfill使用的特性,配置useBuiltIns选项
```markdown
entry: {
   main:['@babel/polyfill','./src/index.js'] 
}   
rules: [{
    test: /\.js$/,
    include: './src/',
    use: [{
        loader:'babel-loader',// babel和webpack沟通的桥梁
        options: {
            presets: [['@babel/preset-env', {
                useBuiltIns: 'usage' // 只polyfill使用的高级特性
            }]]
        }
    }]
}]
```
## plugins
在webpack的构建的整个过程中做处理
## 开发环境开启热更新
1. 使用webpack自带的热更新
首先安装webpack-dev-server `npm i webpack-dev-server -D`
配置devServer，以及配置`HotModuleReplacementPlugin`插件
```markdown
deServer: {
    contentBase:'./dist/'
    open: true,
    port: 8090,
    hot: true
},
plugins: [
    new webpack.HotModuleReplacementPlugin()
 ]

```
在index.js文件中
```javascript
import './index.css'
import {number} from "./number";
import {counter} from "./counter";
import './index.css' // 改变css文件，可以热刷新，是因为css-loader实现了下面的代码
counter()
number()
// js模块的修改，要想热刷新，需要手写
if(module.hot) {
    // some文件发生变化了，重新执行里面的方法
    module.hot.accept('./number.js', () => {
        number()
    })
}
```
2. 使用第三方热更新插件
webpack-dev-middleware

## sourceMap
sourcemap是为了解决开发代码与实际运行代码不一致时帮助我们debug到原始开发代码的技术

原理:

这篇博客比较有代表性：[Introduction 
to JavaScript Source Maps](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)，阮一峰的文章[JavaScript Source Map](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html) 详解也大量参考该博客。
关于sourcemap的原理及作用，基本在这两篇文章中讲清楚了
webpack的devtool的选项
```markdown
(none)

eval
eval-cheap-source-map
eval-cheap-module-source-map
cheap-source-map
cheap-module-source-map
inline-cheap-source-map
inline-cheap-module-source-map
inline-source-map
source-map

```
eval和source-map都是webpack中devtool的配置选项，
eval模式是使用eval将webpack中每个模块包裹，然后在模块末尾添加模块来源//# souceURL， 依靠souceURL找到原始代码的位置。包含eval关键字的配置项并不单独产生.map文件,  eval模式有点特殊， 它和其他模式不一样的地方是它依靠sourceURL来定位原始代码， 而其他所有选项都使用.map文件的方式来定位

![image-20200326132040013](G:\relearn front-end\webpack\images\image-20200326132040013.png)

包含source-map关键字的配置项都会产生一个.map文件，该文件保存有原始代码与运行代码的映射关系， 浏览器可以通过它找到原始代码的位置。（注：包含inline关键字的配置项也会产生.map文件，但是这个map文件是经过base64编码作为DataURI嵌入），举个栗子：eval-source-map是eval和source-map的组合，可知使用eavl语句包括模块，也产生了.map文件

如果包含cheap关键字，则产生的.map文件不包含列信息。也就是说当你在浏览器中点击该代码的位置时， 光标只定位到行数，不定位到具体字符位置。而不包含cheap关键字时， 点击控制台log将会定位到字符位置。

module关键字， 当加上module关键字webpack将会添加loader的sourcemap
