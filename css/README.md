# css
## css选择器
    元素选择器 div{width: 200px}
    伪元素选择器 div::before{}
    类选择器 .box{}
    伪类选择器 a:hover{}
    id选择器 #uniq{}
    后代选择器 body div{}
    子元素选择器 span>strong{}
    相邻兄弟选择器 ul li + li{}
    通用选择器 *{} // 匹配所有的标签

**浏览器解析css选择器是从右往左**，出于性能考虑，所以为了性能，选择器不要嵌套太深

