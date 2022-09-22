/*В функцию передается несколько массивов. 
Из первого массива, переданного в функцию, 
вывести элементы, которые имеются во всех других массивах,
переданных в функцию.

Input: (
    [3, 6, 1, 8, 3, 6, 3, 6, 3, 6], 
    [1, 4, 2, 4],
    [6, 3, 2, 8, 1]
    )



Output: [1]*/

const array1 = [3, 6, 1, 8, 3, 6, 3, 6, 3]
const array2 = [1, 4, 2, 4]
const array3 = [6, 3, 2, 8, 1]


function checkArray(...arr) {
    let lst = []
    let res = []
    let num = 0

    console.log(arr)

    for (let i = 0; i < arr[0].length; i++) {

        for (let n = 0; n < arr[1].length; n++) {
            if (arr[0][i] === arr[1][n]) {
                lst.push(arr[0][i])
                num += 1
            }
        }
    
            if (num === 1) {
            
                for (let j = 0; j < arr[2].length; j++) {
                
                    if (arr[0][i] === arr[2][j]) {
                        lst.push(arr[0][i])
                    }
                }
                num = 0
            }
    }

    console.log(lst)

    for (let l = 0; l < lst.length; l++) {   

        if (lst[l] != lst[l+1] && lst[l] != lst.length) {
            res.push(lst[l])
        }
    
    }

    console.log(res)
    return res
}


checkArray(array1, array2, array3)

