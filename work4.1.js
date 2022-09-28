/*Напишите функцию, 
которая добавит в первый массив только те значения, 
которые присутствуют во втором, но нет в первом

Input: ( [5, 8, -3, 7, 3, 7, 3, 8, 9, 2, 8, -2], [8, 5, 7, -3, 6, 3, 1, 4, 2] )


Output: [5, 8, -3, 7, 3, 7, 3, 8, 9, 2, 8, -2, 6, 1, 4]*/


const array1 = [5, 8, -3, 7, 3, 7, 3, 8, 9, 2, 8, -2]
const array2 = [8, 5, 7, -3, 6, 3, 1, 4, 2]



function addUnicElem(arr1, arr2) {
    let num = 0
    let res = []

    for (let i = 0; i < arr2.length; i++) {

        for (let n = 0; n < arr1.length; n++) {
            
            if (arr2[i] != arr1[n]) {
                num += 1
            }

            if (n + 1 === arr1.length) {
              
                if (num === arr1.length) {
                    arr1.push(arr2[i])
                    num = 0
                } else {
                    num = 0
                }
            }
        }
    }
    console.log(arr1)

    return arr1
}

addUnicElem(array1, array2)