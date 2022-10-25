/*Реализуйте функцию, 
которая параметром принимает объект. 
Выведите сформированную строку для браузера ('https://underscorejs.org') 
с параметрами. Например, { a: 4, b: 8 } => "https://underscorejs.org?a=4&b=8".


Input: ( "https://docs.google.com", { id: "terdh673bb8", limit: 5, offset: 0 } )

Output: "https://docs.google.com?id=terdh673bb8&limit=5&offset=0"*/


function createUrl(str, obj) {
    let arr = []

    for (let key of Object.keys(obj)) {
        arr.push(key)
        arr.push(obj[key])
    }

    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            str += '?'            
            str += arr[i]
        } else if (i % 2 != 0 && i != 0 && i + 1 != arr.length) {
            str += '='
            str += arr[i]
            str += '&'
        } else if (i % 2 != 0 && i != 0 && i + 1 === arr.length) {
            str += '='
            str += arr[i]
        } else {
            str += arr[i]
        }
    }

    console.log(str)
    return str
}

createUrl("https://docs.google.com", { id: "terdh673bb8", limit: 5, offset: 0 })