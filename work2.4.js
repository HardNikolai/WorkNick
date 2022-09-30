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

    for (let i = num1; i < num2 + 1; i+=num3) {
        result.push(i)
    }

    if (num3 < 0) {

        for (let i = num1; i + 1 > num2; i+=num3) {
            result.push(i)
        }
    }

    console.log(result)

}


range(5, 2, -1)
range(4, 16, 2)