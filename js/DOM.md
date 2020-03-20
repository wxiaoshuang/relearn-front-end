
# 什么是DOM
> DOM 是一项 W3C (World Wide Web Consortium) 标准。
  DOM 定义了访问文档的标准

DOM可以将任何HTML或XML文档描绘成一个由多层节点构成
的结构

# 节点操作API
JavaScript中的所有节点类型都继承自Node
类型，因此所有节点类型都共享着相同的基本属性和方法。
每个节点都有一个nodeType
属性，用于表明节点的类型

重要的节点属性
nodeType
nodeName
## 查找节点
document.getElementById ：根据ID查找元素，大小写敏感，如果有多个结果，只返回第一个；

document.getElementsByClassName ：根据类名查找元素，多个类名用空格分隔，返回一个 HTMLCollection 。

document.getElementsByTagName ：根据标签查找元素， * 表示查询所有标签，返回一个 HTMLCollection 。

document.getElementsByName ：根据元素的name属性查找，返回一个NodeList 。

document.querySelector ：返回单个Node，如果匹配到多个结果，只返回第一个。

document.querySelectorAll ：返回一个 NodeList。

document.forms ：获取当前页面所有form，返回一个 HTMLCollection 

说明： 
>  NodeList 对象是从文档中提取的节点列表（集合）。    
   NodeList 对象与 HTMLCollection 对象几乎相同。  
   如使用 getElementsByClassName() 方法，某些（老的）浏览器会返回 NodeList 对象而不是 HTMLCollection。   
   所有浏览器都会为 childNodes 属性返回 NodeList 对象。   
   大多数浏览器会为 querySelectorAll() 方法返回 NodeList 对象。
  
    
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
let p = document.createElement("p");
let node = document.createTextNode("创建一个文本节点");
```

## 遍历
