
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
let para = document.createElement("p");
let node = document.createTextNode("创建一个文本节点");
```

## 遍历
# 事件
事件流分为冒泡和捕获
事件冒泡

事件开始时由最具体的元素（
文档中嵌套层次最深的那个节点）接收，
然后逐级向上传播到较为不具体的节点（文档）

事件捕获

事件捕获的思想是不太具体的节点应该更早接收到事件，
而最具体的节点应该最后接收到事件。
事件捕获的用意在于在事件到达预定目标之前捕获
## 事件处理程序
1.通过HTML指定事件处理程序

```html
<button onclick="showMessage()"</button>
<script>
function showMessage() {
    // 这里可以做很多事情
}
</script>

```
通过HTML指定事件处理程序的缺点是HTML与JavaScript代码紧密耦合。如果要更换事件处理程序，
就要改动两个地方：HTML代码和JavaScript代码。
而这正是许多开发人员摒弃HTML事件处理程序，
转而使用JavaScript指定事件处理程序的原因

2. Javascript制定事件处理程序 

2.1 onclick
```javascript
let btn = document.getElementById('myBtn');
btn.onclick = function(e) {
    alert(this.id)    //"myBtn"
    this === btn // true
}
```
**用这种法指定的事件处理程序被认为是元素的方法。
因此，这时候的事件处理程序是在元素的作用域中运行；
换句话说，程序中的this引用当前元素**

要删除事件处理程序，也很简单
```javascript
btn.onclick = null
```
2.2 addEventListener和removeEventListener
```javascript
let btn = document.getElementById('myBtn')
btn.addEventListener('click', handler, false) // false代表不冒泡,true代表冒泡
function handler(event) {
    // event  事件对象
     this === btn //  true
}
// 移除事件处理程序
btn.removeEventListener('click', handler, false)
```
### 　IE事件处理程序
addEventListener和removeEventListener在低版本的IE中不支持
   低版本的IE实现了类似的两个方法：attachEvent()和detachEvent()
   这两个方法接受相同的两个参数：
   事件处理程序名称与事件处理程序函数。
   由于IE8及更早版本只支持事件冒泡，所以通过
   attachEvent()
   添加的事件处理程序都会被添加到冒泡阶段
```javascript
let btn = document.getElementById('myBtn')
btn.attachEvent('click', handler) // false代表不冒泡,true代表冒泡
function handler() {
    let event = window.event // 事件对象在window上
    // this? window
}
// 移除事件处理程序
btn.detachEvent('click', handler)
```
## 封装兼容的事件处理程序
```javascript
let EventUtil = {
    addHandler: function(element, type, handler) {
        if(element.addEventListener) {
            element.addEventListener(type, handler,false)
        } else if(element.attachEvent) {
            element.attachEvent('on' + type, handler)
        } else {
            element['on' + type] = handler
        }
    },
    removeHandler: function(element, type, handler) {
         if(element.removeEventListener) {
                    element.addEventListener(type, handler,false)
                } else if(element.detachEvent) {
                    element.detachEvent('on' + type, handler)
                } else {
                    element['on'+ type] = null
                }
    },
    // 获取事件对象
    getEvent(e) {
        return e || window.event
    },
    // 获取目标元素
    getTarget(e) {
       e.target || e.srcElement
    },
     //禁用默认行为
    preventDefault(e) {
        if(e.preventDefault) {
            e.preventDefault()
        } else {
            e.returnValue = false // 低版本IE
        }
    },
    // 阻止冒泡传播
    stopPropagation(e) {
        if(e.stopPropagation) {
            e.stopPropagation()
        } else {
            e.cancelBubble = true // 低版本IE
        }
    }
}
```
## 事件对象
触发DOM上的某个事件时，会产生一个事件对象event
，这个对象中包含着所有与事件有关的信息。
包括导致事件的元素、
事件的类型以及其他与特定事件相关的信
## 事件类型
