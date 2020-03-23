var arr  = [0, 1, 2, 3]
arr.key= "some"
Array.prototype.protoKey = "hahah"
for(var i = 0; i < arr.length; i++) {
    console.log(arr[i])
   
}
arr.forEach(function(v, i) {
    console.log(v)
    
})
arr.every(function(v, i) {
    console.log(v)
    return true;
})
// for(var i in arr) {
//     console.log(i) // 0 1 2 3 key protoKey
// }