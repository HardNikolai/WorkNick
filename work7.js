/*Написать функцию, 
принимающую массив целых чисел и целое число число N.
 В самой функции вычислить sum, 
 прибавляя к нему каждый раз элементы массива по порядку 
 до тех пор, пока sum не превысит заданное число N. 
 Полученное значение функция должна вернуть.

Input: [5,10, 15, 20, 10, 25, 20, 30, 15], 55

Output: 60*/

let array1 = [5, 10, 15, 20, 10, 25, 20, 30, 15]


function certainAmount(arr, num) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        if (sum < num) {
            sum = sum + arr[i]
        }
    }
    console.log(sum)

    return sum
}

certainAmount(array1, 55)