/*Напишите функцию, 
которая заполнит массив следующим образом: 
в первый элемент запишите 'x'
, во второй 'xx',
в третий 'xxx' и так далее. 
Функция параметром принимает длину массива.

Input: 7


Output: [ x, xx, xxx, xxxx, xxxxx, xxxxxx, xxxxxxx ]*/


function creatArray(num) {
    let res = []
    let x = 'x'
    let res_str = ''

    for (let i = 1; i < num+1; i++) {
        
        for (let n = 1; n < i+1; n++) {
            res_str += x

        }

       res.push(res_str)
       res_str = ''

    }

    console.log(res)
    return res
}

creatArray(7)