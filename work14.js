/*Написать функцию, принимающую два числа 
и любую операцию над этими числами 
(сложение, вычитание или др.). 
В функции выполнить эту операцию и вернуть результат.*/


function Calculator(num1, num2, elem) {
    let result
    switch(elem) {
        case '+':
            result = num1 + num2
            break
        case '-':
            result = num1 - num2
            break
        case '*':
            result = num1 * num2
            break
        case '/':
            result = num1 / num2
            break
        case '**':
            result = num1 ** num2
            break
        case '%':
            result = num1 % num2
            break
    }
    console.log(result)

    return result
}

Calculator(3, 2, '+')
Calculator(3, 2, '-')
Calculator(3, 2, '*')
Calculator(3, 2, '/')
Calculator(3, 2, '**')
Calculator(3, 2, '%')