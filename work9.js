/*Имеется массив пользователей вида 
[{ name: “Ivan”, age: 24 }]. 
Рассчитать минимальный и максимальный возраст всех пользователей. 
Результат записать в объект вида { min: …, max: … }



Input: [
    { name: “Ivan”, age: 24 }, 
    { name: “Oleg”, age: 16}, 
    { name: “Igor”, age: 24}
]



Output: { min: 16, max: 24 }*/

let array1 = [
    { name: 'Ivan', age: 24 }, 
    { name: 'Oleg', age: 16}, 
    { name: 'Igor', age: 24}
]

let minNum = 100
let maxNum = 0

array1.map(item => {
    if (minNum >= item.age) {
        minNum = item.age
    } else {
        maxNum = item.age
    }
    
})

container = {min: minNum, max: maxNum}

console.log(container)