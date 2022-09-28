/*На вход подается массив со значениями. 
Нужно вывести массив уникальных элементов 
(нет повторений в поданном массиве).


Input: [5, 7, 6, 2, 8, 3, 5, 6, 2, 98, 13]

Output: [7, 8, 3, 98, 13]*/


const array1 = [5, 7, 6, 2, 8, 3, 5, 6, 2, 98, 13]

let num = 0
let res = []

for (let i = 0; i < array1.length; i++) {
    
    for (let n = 0; n < array1.length; n++) {

        if (array1[i] === array1[n]) {
            num += 1
        }

        if (n + 1 === array1.length) {
            
            if (num === 1) {
                
                res.push(array1[i])
                num = 0

            } else {
                num = 0
            }
        }
    }
}

console.log(res)