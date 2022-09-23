/*Удалить из массива значения, 
индексы которых указаны во втором массиве.

Input: ([5, 2, 8, 6, 1, 9, 3, 6, 3, 7, 1], [2, 5, 1])


Output: [5, 6, 1, 3, 6, 3, 7, 1]*/


const array1 = [5, 2, 8, 6, 1, 9, 3, 6, 3, 7, 1]
const array2 = [2, 5, 1]
let res_arr = []
console.log(array1)


for (let i = 0; i < array2.length; i++) {

    for (let j = 0; j < array1.length; j++) {

        if (array2[i] === j) {
            console.log(array2[i], j)
            array1[j] = ''            
        } 
    }
}


for (let i = 0; i < array1.length; i++) {

    if (typeof(array1[i]) === typeof(1)) {

        res_arr.push(array1[i])
    }
}



console.log(array1)
console.log(res_arr)