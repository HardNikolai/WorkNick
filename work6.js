/*
Имеется массив пользователей вида 
[{ name: “Ivan”, age: 24 }]. 
Вывести имена тех пользователей, 
возраст которых больше 18 лет.

Input: [{ name: “Ivan”, age: 24 },
     { name: “Oleg”, age: 16}, 
     { name: “Igor”, age: 24}]

Output:

Ivan

Igor*/


let array1 =  [
    { name: 'Ivan', age: 24 },
    { name: 'Oleg', age: 16}, 
    { name: 'Igor', age: 24}
]

array1.map(item => {
    if (item.age > 18){
        console.log(item.name)
    }
})