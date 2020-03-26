import {number} from "./number";
import {counter} from "./counter";
import './index.css' // 改变css文件，可以热刷新，是因为
counter()
number()
if(module.hot) {
    // number模块发生了变化，重新执行
    module.hot.accept('./number', function() {
        document.removeChild(document.querySelector('#number'))
        number();
    })
}
