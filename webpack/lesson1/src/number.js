
function number () {
    var root = document.querySelector('#root')
    var div = document.createElement('div')
    div.setAttribute('id','number')
    div.innerHTML = '2000';
    root.appendChild(div)
}
export {number}
