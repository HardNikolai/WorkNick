/*Имеется массив строк.
Строки в массиве могут повторяться любое количество раз. 
Вывести уникальные строки и их количество в массиве.

Input: [“aaa”, “bbb”, “ccc”, “aaa”, “bbb”, “”, aaa“”]


Output: 

aaa 3

bbb 2

ccc 1*/

const array1 = ['aaa', 'bbb', 'ccc', 'aaa', 'bbb', '', 'aaa']


function checkingDuplicateElements(arr) {
    let array2 = []
    let result = []

    for (let i = 0; i < arr.length; i++) {
        
        if (arr[i].length != 0) {
            array2.push(arr[i])
        }
    }

    for (let i = 0; i < array2.length; i++) {
        let check_elem = array2[i]
        let bul_res = result.includes(check_elem)

        if (bul_res != true) {
            result.push(check_elem)
        }

    }

    for (let i = 0; i < result.length; i++) {
        let count = 0

        for (let n = 0; n < array2.length; n++) {

            if (result[i] === array2[n]) {
                count += 1
            }

        }
        console.log(result[i], count)
    }
}

checkingDuplicateElements(array1)