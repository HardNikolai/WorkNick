/*Напишите функцию, 
которая четное число возводит в квадрат,
а нечетное - в куб. 
После умножает полученное значение на второй параметр. 
Затем прибавляет третий параметр и находит корень 
от получившегося результата, округленный до сотых. 
Но за счет того, что функция вызывает функцию.

Input: func (17)(6)(2)



Output: 171,69*/


function curry(func) {
    return function(a) {
        return function(b) {
            return function(c) {
                return func(a, b, c)
            }
        }
    }
}


function raiseNum(a, b, c) {
    let result = a ** 3 * b + c
    result = Math.sqrt(result)
    result = String(result)
    let num = 0
    let result_num = ''

    for (let i = 0; i < result.length; i++) {
        if (result[i] === '.') {
            num += 1
            result_num += ','
        } else if (num === 1 || num === 2) {
            result_num += result[i]
            num += 1
        }else if (num === 0){
            result_num += result[i]
        }
    }

    return result_num
}

let func_curry = curry(raiseNum)

console.log(func_curry(17)(6)(2))

