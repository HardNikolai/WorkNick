/*Напишите функцию removeDuplicates(arr),
которая возвращает массив,
в котором удалены повторяющиеся элементы из массива arr 
(игнорируйте чувствительность к регистру).

Input: [4, 7, 1, 9, 6, 8, 4, 6, 3, 6]

Output: [4, 7, 1, 9, 6, 8, 3]



Input: ["text", "education", "part", "Text"]

Output: ["text", "education", "part"]*/


const array1 = [4, 7, 1, 9, 6, 8, 4, 6, 3, 6]
const array2 = ["text", "education", "part", "Text"]


function removeDuplicates(arr) {
    let array = arr

    for (let i = 0; i < arr.length; i++) {

        let first_el = arr[i]

        for (let n = i + 1; n < arr.length; n++) {

            let second_el = arr[n]

            if (typeof(first_el) === 'string') {
                first_el = first_el.toLowerCase()
                second_el = second_el.toLowerCase()

                if (first_el === second_el) {

                    array.splice(n, 1)
                }
                
            }

            if (first_el === second_el) {

                array.splice(n, 1)
            }
        }
    }

    console.log(array)
    return array
}

removeDuplicates(array1)
removeDuplicates(array2)
