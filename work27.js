/*Имеется двумерный массив. 
Пользуясь возможностями 
ES6 синтаксиса объединить его в одномерный массив.

Input: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]



Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]*/


const array1 = [
    [1, 2, 3], 
    [4, 5, 6], 
    [7, 8, 9]
]


const array2 = []

for (let i = 0; i < array1.length; i++) {

    for (let n = 0; n < array1[i].length; n ++) {
        array2.push(array1[i][n])
    }
}

console.log(array2)