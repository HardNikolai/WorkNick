/*Написать функцию, принимающую на вход неотформатированный 
номер телефона и возвращающую его в отформатированном виде.

Input: 88005553535

Output: 8 (800) 555-35-35*/


const num1 = 88005553535


function formatNumber(elem) {
    let a = elem.toString()

    let result = `${a.slice(0, 1)} (${a.slice(1, 4)}) ${a.slice(4, 7)}-${a.slice(7, 9)}-${a.slice(9, 11)}`

    console.log(result)

    return result
}


formatNumber(num1)