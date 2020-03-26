// 懒加载
function getComponent() {
    const element = document.createElement('div');
    // Lodash, now imported by this script
    return import(/* webpackChunkName: "lodash" */ 'lodash').then(({default: _}) => {
        const element = document.createElement('div');

        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;

    }).catch(error => 'An error occurred while loading the component');
}
document.onclick = function() {
    getComponent().then(component => {
        document.body.appendChild(component);
    })
}


