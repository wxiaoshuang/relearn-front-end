import avater  from './images/tree.png'
console.log('avater',avater)
function Content () {
    var root = document.querySelector('#root')
    var img = document.createElement('img')
    img.setAttribute('src', avater)
    root.append(img)
}
export {Content}

