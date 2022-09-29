/*Вернуть массив тех значений, 
которые есть в первом, но нет во втором.


Input: ([4, 7, 2, 9, 3, 5, 6, 4, 5, 1, 4], [4, 5, 6, 7, 8])



Output: [2, 9, 3, 1]*/


const array1 = [4, 7, 2, 9, 3, 5, 6, 4, 5, 1, 4]
const array2 = [4, 5, 6, 7, 8]
let result = []

let num = 0

for (let i = 0; i < array1.length; i++) {

    for (let n = 0; n < array2.length; n++) {

        if (array1[i] === array2[n]) {

            num = 0
            break

        }

        num += 1
        
        if (num === array2.length) {
                result.push(array1[i])
                num = 0
            }
    }
}

console.log(result)