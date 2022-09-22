/*Написать функцию, принимающую на вход массив чисел, 
функцию фильтрации и функцию преобразования, 
которая фильтрует массив, преобразует данные, 
а затем выводит их.

Input: [1, 2, 3, 4], (el) => el %2 == 0, (el) => el * 2

Output:

4

8*/

const array1 = [1, 2, 3, 4]

function arrayEven(arr) {
    let array = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            array.push(arr[i])
        }
    }

    return array
}   


function arraySquare(arr) {
    let array = []
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i] * 2)
    }
}


function filterArray(arr, func1, func2) {
    func2(func1(arr))
}


filterArray(array1, arrayEven, arraySquare)