/*Имеется массив, заполненный целочисленными числами. 
Написать функцию, принимающую этот массив и выводящую элементы 
только с четным индексом, не используя условный или тернарный оператор.

Input: [14, 53, 23, 53, 13, 55, 7, 34, 3, 6]

Output: [14, 23, 13, 7, 3]*/


let array1 = [14, 53, 23, 53, 13, 55, 7, 34, 3, 6]


function getEvenIndex(arr) {
    let array2 = []
    for (let i = 0; i < array1.length; i+=2) {
        array2.push(arr[i]);
    }
    console.log(array2)
    return array2
}

getEvenIndex(array1)