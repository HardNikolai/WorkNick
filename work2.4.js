/*Напишите функцию range(), 
принимающую два аргумента: 
начало и конец диапазона. 
Функция возвращает массив, 
который содержит все числа из диапазона,
включая начальное и конечное. 
Третий необязательный аргумент функции range()
– шаг для построения массива. Убедитесь,
что функция range() работает с отрицательным шагом.


Input: range(5, 2, -1)

Output: [5, 4, 3, 2]



Input: range(4, 16, 2)

Output: [4, 6, 8, 10, 12, 14, 16]*/


function range(num1, num2, num3) {
    let result = []

    if (num3 === undefined) {

        for (num1; num1 <= num2; num1++) {
            result.push(num1)
        }
        console.log(result)

        return result

    } else if (typeof(num3) === typeof(0)) {
        let check_num = 1
        let new_num = 1

        if (num3 > 0) {

            for (num1; num1 <= num2; num1++) {
                
                if (check_num === 1) {
                    result.push(num1)
                    check_num = num3
                } else if (check_num === num3) {

                    if (new_num != num3) {
                        new_num += 1
                    } else {
                        result.push(num1)
                        new_num = 1
                    }
                }
            }
            console.log(result)

            return result

        } else if (num3 < 0) {
            let positiveNum3 = num3 * -1

            for (num1; num1 >= num2; num1--) {

                if (check_num === 1) {
                    result.push(num1)
                    check_num = positiveNum3

                } else if (check_num === positiveNum3) {
                    
                    if (new_num != positiveNum3) {
                        new_num += 1
                    } else {
                        result.push(num1)
                        new_num = 1
                    }
                }
            }
            console.log(result)

            return result
        } 
    }
}


range(5, 2, -1)
range(4, 16, 2)