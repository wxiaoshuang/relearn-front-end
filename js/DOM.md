
# 什么是DOM
> DOM 是一项 W3C (World Wide Web Consortium) 标准。
  DOM 定义了访问文档的标准

DOM可以将任何HTML或XML文档描绘成一个由多层节点构成
的结构
## 节点Node
JavaScript中的所有节点类型都继承自Node
类型，因此所有节点类型都共享着相同的基本属性和方法。
每个节点都有一个nodeType属性，用于表明节点的类型
有12种节点类型，但不是所有的浏览器都支持
**常用的就是元素和文本节点**

元素节点，也叫标签节点        nodeType 1

文本几点                                    nodeType 3

注释节点                                    nodeType 2

### 节点关系

![image-20200327112758510](G:\relearn front-end\js\images\node.png)

# 节点操作API


## 查找节点
document.getElementById ：根据ID查找元素，大小写敏感，如果有多个结果，只返回第一个；

document.getElementsByClassName ：根据类名查找元素，多个类名用空格分隔，返回一个 HTMLCollection 。

document.getElementsByTagName ：根据标签查找元素， * 表示查询所有标签，返回一个 HTMLCollection 。

document.getElementsByName ：根据元素的name属性查找，返回一个NodeList 。

document.querySelector ：返回单个Node，如果匹配到多个结果，只返回第一个。

document.querySelectorAll ：返回一个NodeList。

document.forms ：获取当前页面所有form，返回一个 HTMLCollection 

### NodeList v.s. HTMLCollection 
1.包含节点的类型不同(重要)

> (1) NodeList
一个节点的集合，既可以包含元素和其他非元素节点(注释节点、文本节点等)。
(2) HTMLCollection
元素集合, 只有元素Element

2.使用方法

相同点：

1） 都是类数组，都有length属性

2） 都有元素的getter，叫做item，可以传入索引值取得元素。

不同点：

HTMLCollection还有一个nameItem()方法，可以返回集合中name属性和id属性值的元素


## 修改节点属性
```javascript
let img = document.querySelector('img')
img.setAttribute('src', 'xxxx')
img.style.width = '100px'
let p = document.querySelector('p')
p.innerHTML = '<span>嵌套一个span</span>'
```
## 创建和删除

```javascript
let p = document.createElement("p");// 创建元素节点
let textNode = document.createTextNode("创建一个文本节点");
let comment = document.createComment('这是评论')

```

## 遍历
