/*Написать функцию, 
которая принимает параметрами два массива. 
Вернуть массив тех значений, которые есть и в первом и во втором.

Input: ( [5, 2, 7, 3, 6, 8, 2, 9, 1], [4, 2, 9, 4, 5, 4] )


Output: [2, 9, 5]*/

const array1 = [5, 2, 7, 3, 6, 8, 2, 9, 1]
const array2 = [4, 2, 9, 4, 5, 4]


function checkArray(arr1, arr2) {
    let res = []

    for (let i = 0; i < arr1.length; i++) {
        for (let n = 0; n < arr2.length; n++) {
            if (arr1[i] === arr2[n]) {
                res.push(arr1[i])
            }
        }
    }
    return [...new Set(res)]
}

console.log(checkArray(array1, array2))