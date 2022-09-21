/*Заполнить двумерный массив таблицей умножения от 0 до 10 
и вывести её в удобочитаемом виде.*/

let array1 = []

for (let firstNum = 1; firstNum < 10; firstNum++) { 
    let array2 = []
    let result1 = ''

    for (let secondNum = 1; secondNum < 10; secondNum++) {
        let result = `${firstNum} * ${secondNum} = ${firstNum * secondNum}`
        array2.push(result)
        result1 += ` ${result}\n`

    }
    array1.push(array2)
}

console.table(array1)