  TODO
# 继承
# 原型与原型链
构造函数、原型和实例的关
关系

每个构造函数都有一个原型对象，
原型对象都包含一个指向构造函数的指针，
而实例都包含一个指向原型对象的内部指针
# 实现继承的方法
## 1 原型链
其基本思想是利用原型让一个引用类型继承另一个引用类型的
属性和方法
```javascript
function Parent() {
    this.age = 50
}
function Child() {
    this.age = 40
}
Child.prototype = new Parent()
```
原型链的问题
## 借用构造函数
