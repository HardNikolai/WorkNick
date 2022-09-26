/*Создайте функцию, 
которая параметром принимает объект. 
Функция умножает все числовые свойства объекта на 2.

Input: {
  name: "test",
  age: 25,
  weight: 65,
  height: 165
}


Output: {
  name: "test",
  age: 50,
  weight: 130,
  height: 330
}*/

const people_obj = {
    name: "test",
    age: 25,
    weight: 65,
    height: 165
}


function mulParam (obj) {
    let new_obj = {}

    for (key in obj) {

        if (typeof(obj[key]) === typeof(0)) {

            new_obj[key] = obj[key] * 2
        } else {

            new_obj[key] = obj[key]
        }
    }

    console.log(new_obj)

    return new_obj
}

mulParam(people_obj)