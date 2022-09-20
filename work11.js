/*Заполнить двумерный массив таблицей умножения от 0 до 10 
и вывести её в удобочитаемом виде.*/

let array1 = []

for (let firstNum = 1; firstNum < 10; firstNum++) { 
    let array2 = [] 
    for (let secondNum = 1; secondNum < 10; secondNum++) {
        result = `${firstNum} * ${secondNum} = ${firstNum * secondNum}`
        array2.push(result)
        console.log(result)
    }
    array1.push(array2)
}

console.log(array1)