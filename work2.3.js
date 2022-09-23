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


function removeDuplicates(array) {
    let obj = {}
    let result = [];
    let num = 0

    for (let i = 0; i < array.length; i++) {
        
        if (typeof(array[i]) === typeof(0)) {
            num += 1

            if (num === array.length) {
                for (let i = 0; i < array.length; i++) {
                    let str = array[i]

                    obj[str] = str
                }
    
                for (i in obj) {
                    let int = Number(i)

                    result.push(int)
                }
    
                console.log(result)
                return result
            }
        } else if (typeof(array[i]) === typeof('a')) {
            num += 1

            if (num === array.length) {

                for (let i = 0; i < array.length; i++) {
                    let str = array[i].toLowerCase()

                    obj[str] = str
                }
                
                for (key in obj) {
                    result.push(key)
                }

                console.log(result)
                return result
            }
        }
    }
}

removeDuplicates(array1)
removeDuplicates(array2)
