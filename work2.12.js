/*Реализуйте функцию, 
которая принимает на вход объект типа 
{ "dog": 6, "cat": 11 } и возвращает массив пар.

Input: { "dog": 6, "cat": 11 }

Output: [ ["dog", 6], ["cat", 11] ]*/


const animal_obj = {
    'dog': 6,
    'cat': 11
}


function arrayFromObj(obj) {
    let res = []

    for (key in obj) {
        let arr = []

        arr.push(key)
        arr.push(obj[key])

        res.push(arr)
    }

    console.log(res)
    
    return res
}


arrayFromObj(animal_obj)