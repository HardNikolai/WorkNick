/*Написать функцию, принимающую массив строк и выводящих их на экран,
используя цикл while. Элементы из массива извлекать с помощью оператора .pop()*/

let array1 = ['a', 'b', 'c', 'd', 'e', 'f']

console.log(array1)

function getWord(arr) {
    arr.reverse()

    let mass1Len = arr.length
    let i = 0
    let array2 = []
    let array3 = []
    
    while (i < mass1Len) {
        array2 = array1.pop(i)
        array3 += array2
        i++
    }
    
    return array3
}

console.log(getWord(array1))