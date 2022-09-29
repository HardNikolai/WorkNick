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
    let res = []
    let num = 1

    for (let i = 0; i < arr[0].length; i++) {
        
        for (let n = 1; n < arr.length; n++) {
            
            for (let j = 0; j < arr[n].length; j++) {
    
                if (arr[0][i] === arr[n][j]) {

                    num += 1

                }

                if (n === arr.length - 1 && j === arr[n].length - 1) {
                    
                    if (num === arr.length) {

                        res.push(arr[0][i])
                        num = 1

                    } else {

                        num = 1

                    }
                }
            }
        }
    }
    console.log(res)
  
    return res
}


checkArray(array1, array2, array3)
checkArray([1], [1,2], [1, 4], [3,4])
