/*Имеется объект пользователя следующего вида
{
 id: 123,
 first_name: ‘Ivan’,
 last_name: ‘Ivanov’,
 password: ‘Mypwd!23’,
 age: 13
}

Пользуясь возможностями ES6 
синтаксиса получить на основании пользователя новый объект, 
но без поля password.*/

const obj1 = {
    id: 123,
    first_name: 'Ivan',
    last_name: 'Ivanov',
    password: 'Mypwd!23',
    age: 13
   }

const obj2 = {}
let num = 0


for (key in obj1) {
    if (obj1[key] != 'Mypwd!23') {
        obj2[key] = obj1[key]
    }        
}

console.log(obj2)