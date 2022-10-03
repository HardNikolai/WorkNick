/*Дан двухмерный массив с числами, 
например [[1, 2, 3], [4, 5], [6]]. 
Найдите сумму элементов этого массива. 
Массив, конечно же, может быть произвольным.

Input: [ [1, 2, 3], [4, 5], [6] ]

Output: 21*/

const array1 = [[1, 2, 3], [4, 5], [6]]


function sumEl(arr) {
    let res = 0

    for (let i = 0; i < arr.length; i++) {

        for (let n = 0; n < arr[i].length; n++) {
            res += arr[i][n]
        }
    }
    return res
}

console.log(sumEl(array1))