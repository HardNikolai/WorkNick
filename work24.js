/*Написать функцию, 
которая принимает массив целых чисел и строку, 
которая может иметь одно из трёх значений: 
‘ASC’, ’DESC’, ‘NOT SORT’. 
Функция должна сортировать массив числе и возвращать его. 
Если строковый параметр равен ‘ASC’, то сортировать в порядке возрастания, 
если - ’DESC’, то в порядке убывания. 
В остальных случаях возвращать отсортированный массив.

Input: [4, 5, 2, 4, 1, 5, 3], ‘ASC’


Output: [1, 2, 3, 4, 4, 5, 5]*/

const array1 = [4, 5, 2, 4, 1, 5, 3]


function sortingArr(arr, str) {
    let res = arr
    
    switch (str) {
        case 'DESC':
            res = res.sort((a, b) => {
                return b - a
            })
            break
        case 'ASC':
            res = res.sort((a, b) => {
                return a - b
            })
            break
    }
    return res
}

console.log(sortingArr(array1, 'DESC'))
console.log(sortingArr(array1, 'ASC'))