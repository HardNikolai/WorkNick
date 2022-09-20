/*Написать функцию, принимающую на вход ФИО в виде одной строки.
Функция должна возвращать объект вида 
{ first_name: “Имя”, last_name: “Фамилия”, patronymic_name: “Отчество”}

Input: “Иванов Пётр Андреевич”

Output: { first_name: “Пётр”, last_name: “Иванов”, patronymic_name: “Андреевич”}*/

const fio = 'Иванов Пётр Андреевич'


function dbFio(db_name) {
    let container = {}
    let num1 = 0
    let num2 = 0
    let surname
    let name 
    let second_name


    for (let i = 0; i < db_name.length; i++) {
        if (db_name[i] === ' ' && num1 === 0) {
            num1 = i
            } else if (db_name[i] === ' ' && num1 > 0) {
                num2 = i
            }
        }


    surname = db_name.slice(0, num1)
    name = db_name.slice(num1+1, num2)
    second_name = db_name.slice(num2+1)
    
    container['first_name'] = name
    container['last_name'] = surname
    container['patronymic_name'] = second_name

    console.log(container)

    return container
}


dbFio(fio)