/*Напишите функцию, 
которая переставит местами максимальный 
и минимальный элемент в массиве.

Input: [5, 7, 2, 9, 5, 6, 3, 1, 8]


Output: [5, 7, 2, 1, 5, 6, 3, 9, 8]*/

const array1 = [5, 7, 2, 9, 5, 6, 3, 1, 8]


function min_max_el(arr) {
    let res = []
    let max_el = Math.max.apply(null, arr)
    let min_el = Math.min.apply(null, arr)

    arr.indexOf(max_el)

    for (let i = 0; i < arr.length; i++) {

        if (arr.indexOf(max_el) === i) {
            res.push(min_el)
            
        } else if(arr.indexOf(min_el) === i) {
            res.push(max_el)

        } else {
            res.push(arr[i])
        }
    }

    console.log(res)
    return res
}


min_max_el(array1)