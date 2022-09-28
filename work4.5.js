/*Дан массив чисел. 
Каждое число в массиве встречается четное количество раз, 
кроме одного. Реализуйте и экспортируйте функцию по умолчанию, 
которая принимает массив чисел и возвращает число, 
которое встречается нечетное количество раз.

Input: [5, 8, 2, 4, 5, 4, 2, 4, 2, 5, 2, 4, 5]

Output: 8*/


const array1 = [5, 8, 2, 4, 5, 4, 2, 4, 2, 5, 2, 4, 5]


function negaticNum(arr) {
    let num = 0
    let res 

    for (let i = 0; i < arr.length; i++) {

        for (let n = 0; n < arr.length; n++) {

            if (arr[i] === arr[n]) {
                num += 1
            }

            if (n + 1 === arr.length) {
                
                if (num === 1) {
                    res = arr[i]
                    num = 0

                } else {

                    num = 0

                }
            }
        }
    }
    console.log(res)
    return res
}


negaticNum(array1)