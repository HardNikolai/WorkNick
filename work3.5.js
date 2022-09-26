/*Реализуйте функцию, 
которая принимает на вход массив, 
состоящий из массивов-пар. А возвращает объект, 
полученный из этих пар. 
Если при конструировании объекта попадаются совпадающие ключи, 
то берётся значение из последнего массива-пары.

Input: [ ["cat", 5], ["dog", 6], ["cat", 11] ]

Output: { "dog": 6, "cat": 11 }



Input: [ ["name", "test"], ["age", 12], ["country", "RF"] ]

Output: { "name": "test", "age": 12, "country": "RF" }*/


const array1 = [ 
    ["cat", 5], 
    ["dog", 6], 
    ["cat", 11]
]


const array2 = [ 
    ["name", "test"], 
    ["age", 12], 
    ["country", "RF"] 
]


function do_obj(arr) {
    let obj = {}

    for (let i = 0; i < arr.length; i++) {
        obj[arr[i][0]] = arr[i][1]    
    }

    console.log(obj)
    
    return obj
}


do_obj(array1)
do_obj(array2)