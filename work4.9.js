/*Напишите функцию, 
которая удалит из первого массива все значения, 
которые указаны во втором массиве.


Input: ( [5, 7, 2, -1, 7, 8, 3, 6, 2, 9, 4, -7], [2, -1, 9] )

Output: [5, 7, 7, 8, 3, 6, 4, -7]*/



function delElemArr(arr1, arr2) {
    let res
    for (let i = 0; i < arr2.length; i++) {

        for (let n = 0; n < arr1.length; n++) {
          
            if (arr2[i] === arr1[n]) {
                
                res = arr1.splice(n, 1)

            }
        }
    }

    console.log(arr1)
    return arr1
}


delElemArr([5, 7, 2, -1, 7, 8, 3, 6, 2, 9, 4, -7], [2, -1, 9])