/*Напишите функцию, 
которая находит наиболее часто встречаемый элемент массива.


Input: [6, 3, 8, 2, 6, 8, 2, 5, 7, 2, 6, 8, 6, 2, 6]

Output: 6*/


function oftenNum(arr) {
    let res
    arr.sort()
    let res_arr = []

    let len_arr = 0

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] === arr[i+1]) {

            res_arr.push(arr[i])

        } else {

            if (i === 0) {
                len_arr = res_arr.length
            } else if (len_arr < res_arr.length) {
                
                len_arr = res_arr.length
                res = arr[i]
    
            }
            
            res_arr = []
        }
        
    }

    console.log(res)
    return res
}


oftenNum([6, 3, 8, 2, 6, 8, 2, 5, 7, 2, 6, 8, 6, 2, 6])