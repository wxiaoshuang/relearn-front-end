
function counter () {
    var div = document.createElement('button')
    div.innerHTML = 1;
    div.onclick= function() {
        div.innerHTML = div.innerHTML * 1 + 1;
    }
    document.body.appendChild(div)
}
export {counter}
