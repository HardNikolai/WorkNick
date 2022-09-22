/*Заполнить двумерный массив таблицей 
квадратов целых чисел от 0 до 100 и вывести её в 
удобочитаемом виде.*/

let array1 = []

for (let firstNum = 0; firstNum < 101; firstNum++) { 
    let array2 = [] 

    result = `${firstNum}^${firstNum} = ${firstNum * firstNum}`
    
    array2.push(result)
    array1.push(array2)
}

console.table(array1)