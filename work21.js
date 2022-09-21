/*Написать функцию, которая принимает на вход объект вида 
{ first_name: ‘Ivan’, last_name: ‘Ivanov’, email: ‘ivanov@pochta.com’ } 
и возвращает строку вида: “Ivanov Ivan E-mail: ivanov@pochta.com”*/


const obj = {
    first_name: 'Ivan',
    last_name: 'Ivanov',
    email: 'ivanov@pochta.com'
}


function strObj(object) {
    let result = ''
    let num = 0
    let len_obj = 0

    for (key in object) {
        len_obj += 1
    }

    for (key in object) {
        if (num < len_obj - 1){
            result += object[key] + ' '
            num += 1
        } else {
            result += object[key]
        }
        
    }

    console.log(result)

    return result
}


strObj(obj)