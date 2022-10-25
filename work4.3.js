/*На вход подается массив со значениями. 
Нужно вывести массив уникальных элементов 
(нет повторений в поданном массиве).


Input: [5, 7, 6, 2, 8, 3, 5, 6, 2, 98, 13]

Output: [7, 8, 3, 98, 13]*/


const array1 = [5, 7, 6, 2, 8, 3, 5, 6, 2, 98, 13]


function unicEl(arr) {
    let num = 0
    let res = []

    for (let i = 0; i < arr.length; i++) {
    
        for (let n = 0; n < arr.length; n++) {
    
            if (arr[i] === arr[n]) {
                num += 1
            }
    
            if (n + 1 === arr.length) {
                
                if (num === 1) {
                    
                    res.push(arr[i])
                    num = 0
    
                } else {
                    num = 0
                }
            }
        }
    }

    return res
}

console.log(unicEl(array1))