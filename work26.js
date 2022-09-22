/*Написать функцию, 
принимающую массив A и любое количество числе в виде аргументов и возвращающую массив A,
заполненный числами, переданными в аргументе.
Например, следующий вызов функции fn([1, 2, 3], 4, 5)
вернёт массив [1, 2, 3, 4, 5]*/

const array1 = [1, 2, 3, 4, 5]


function setArray(arrgs) {
    let result = []

    for (let i = 0; i < arrgs.length; i++) {
        result.push(arrgs[i])
    }
    console.log(result)

    return result
}


setArray(array1, 4, 5)