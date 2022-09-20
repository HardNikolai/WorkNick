/*Написать функцию, принимающую число N, 
и возвращающую массив длиной N, заполненный числами Фибоначчи. 
Числа Фибоначчи - элементы числовой последовательности, 
в которой первые два числа равны 0 и 1, 
а каждое последующее число равно сумме двух предыдущих чисел 
(пример, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233).*/


let array1 = [0, 1]
let array2 = []

function getArrayOfFibonachi(Num) {
    for (let i = 0; i < Num; i++) {
        if (i < 2) {
            array2.push(array1[i])
        } else {
            let num = array2[i-2] + array2[i-1]
            array2.push(num)
        }
    }
    console.log(array2)
    return array2
}

getArrayOfFibonachi(7)