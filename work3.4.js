/*Напишите функцию, 
которая возвращает рандомный элемент из массива.

Input: [4, 8, 2, 9, 4, 6, 5, 1, 7, 4]

Output: 9*/

const array1 = [4, 8, 2, 9, 4, 6, 5, 1, 7, 4]


function randomEl(arr) {
    let random_el = Math.floor(Math.random() * arr.length)

    return arr[random_el]
}

console.log(randomEl(array1))
