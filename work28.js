/*Имеется объект пользователя следующего вида

const user = {
 id: 123,
 first_name: ‘Ivan’,
 last_name: ‘Ivanov’,
 password: ‘Mypwd!23’,
 age: 13
}

Также имеется объект с измененными полями:

const changed = { age: 15,
    password: ‘new password }

Написать функцию, 
принимающую на вход исходный объект
и объект с измененными параметрами 
и возвращающая обновленный исходный объект.
(В объекте и changed могут быть любые поля
из user в любом количестве). 
Для приведённого выше примера результат должен быть следующий:

{
 id: 123,
 first_name: ‘Ivan’,
 last_name: ‘Ivanov’,
 password: ’new password’,
 age: 15
}*/

const user = {
    id: 123,
    first_name: 'Ivan',
    last_name: 'Ivanov',
    password: 'Mypwd!23',
    age: 13
   }

const changed = { 
    age: 15,
    password: 'new password' 
}

function newObj(obj1, obj2) {
    for (key2 in obj2) {
       
        for (key1 in obj1) {

            if (key2 === key1) {
                obj1[key1] = obj2[key2]
            }
        }
    }
    console.log(obj1)
    
    return obj1
}

newObj(user, changed)