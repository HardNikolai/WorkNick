/*Напишите функцию, 
которая возвращает true, 
если в массиве есть все значения, 
которые указаны во втором.

Input: ( [4, 8, 1, 9, -3, 7, 2, 8, 4, -6, 3, 8, 4, 6, 1, 9, -4], [3, 7, -6] )
Output: true


Input: ( [4, 8, 1, 9, -3, 7, 2, 8, 4, -6, 3, 8, 4, 6, 1, 9, -4], [9, 7, -8] )
Output: false*/


function checkArr(arr1, arr2) {
    let num = 0
    let res_num = 0

    for (let i = 0; i < arr2.length; i++) {

        for (let n = 0; n < arr1.length; n++) {

            if (arr2[i] === arr1[n]) {
  
                num +=1
                break
            }
        }

        if (num > 0) {
            res_num += 1
            num = 0
        }
        if (res_num === arr2.length) {

            return true
        }
    }

    return false
}


console.log(checkArr([4, 8, 1, 9, -3, 7, 2, 8, 4, -6, 3, 8, 4, 6, 1, 9, -4], [3, 7, -6]))
console.log(checkArr([4, 8, 1, 9, -3, 7, 2, 8, 4, -6, 3, 8, 4, 6, 1, 9, -4], [9, 7, -8]))