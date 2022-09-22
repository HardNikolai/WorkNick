/*Имеется массив пользователей вида 
[{ name: “Ivan”, age: 24 }]. 
Вывести суммарный возраст всех пользователей.

Input: [{ name: “Ivan”, age: 24 }, 
    { name: “Oleg”, age: 16}, 
    { name: “Igor”, age: 24}]

Output: 64*/

let array1 = [
    { name: 'Ivan', age: 24 }, 
    { name: 'Oleg', age: 16}, 
    { name: 'Igor', age: 24}
]

let sumAge = 0

array1.map(item => {
    sumAge = sumAge + item.age
})

console.log(sumAge)