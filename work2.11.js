/*Написать функцию, 
которая возвращает отсортированный массив уникальных значений.



Input: [5, 2, 8, 4, 8, 2, 5, 8, 2, 17, 8, 4, 2, 4, 7, 3]

Output: [3, 7, 17]*/


const array1 = [5, 2, 8, 4, 8, 2, 5, 8, 2, 17, 8, 4, 2, 4, 7, 3]


function sortUnicArray(arr) {
    let result = []
    let num = 0


    for (let i = 0; i < arr.length; i++) {

        for (let n = 0; n < arr.length; n++) {
    
            if (arr[i] === arr[n]) {
                
                num += 1
            }
        }
    
        if (num === 1) {
    
            result.push(array1[i])
            num = 0
        } else {
            
            num = 0
        }
    }

    for (let j = result.length - 1; j > 0; j--) {
        
        for (let i = 0; i < j; i++) {
            
            if (result[i] > result[i + 1]) {
                let temp = result[i]
    
                result[i] = result[i + 1]
                result[i + 1] = temp
    
            }
        }
    }

    console.log(result)

    return result
}


sortUnicArray(array1)