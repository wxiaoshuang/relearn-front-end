
function counter () {
    var root = document.querySelector('#root')
    var div = document.createElement('button')
    div.innerHTML = 1;
    div.onclick= function() {
        div.innerHTML = div.innerHTML * 1 + 1;
    }
    root.appendChild(div)
}
export {counter}
