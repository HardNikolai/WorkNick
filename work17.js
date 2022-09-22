/*В функцию подается несколько массивов. 
Вернуть один массив со всеми элементами.*/

const array1 = [1, 2, 3, 4, 5]
const array2 = [6, 7, 8, 9, 10]


function sumElemArray(arr1, arr2) {
    let result = []
    for (let i = 0; i < arr1.length; i++) {
        result.push(arr1[i])
    }
    for (let i = 0; i < arr2.length; i++) {
        result.push(arr2[i])
    }
    console.log(result)

    return result
}


sumElemArray(array1, array2)