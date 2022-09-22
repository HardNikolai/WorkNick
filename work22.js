/*Написать функцию, которая принимает три параметра: 
массив array и два числа start и end. 
Функция должна возвращать массив фрагмент массива array, 
начиная с индекса start и заканчивая end.

Input: [13, 14, 32, 23, 34, 21, 44, 47, 86], 4, 6


Output: [34, 21, 44]*/

const array1 = [13, 14, 32, 23, 34, 21, 44, 47, 86]


function enumerationArray(arr, num1, num2) {
    let result = []

    for (let i = 0; i < arr.length; i++) {
        if (i >= num1 && i <= num2) {
            result.push(arr[i])
        }
    }

    return result
}

enumerationArray(array1, 4, 6)