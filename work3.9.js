/*Написать функцию, 
которая принимает параметрами два массива. 
Вернуть массив тех значений, которые есть и в первом и во втором.

Input: ( [5, 2, 7, 3, 6, 8, 2, 9, 1], [4, 2, 9, 4, 5, 4] )


Output: [2, 9, 5]*/

const array1 = [5, 2, 7, 3, 6, 8, 2, 9, 1]
const array2 = [4, 2, 9, 4, 5, 4]


function checkArray(arr1, arr2) {
    let res = []

    let obj1_unic = {}
    let obj2_unic = {}

    let array1_unic = []
    let array2_unic = []

    // Уникальные значение для каждого массива
    for (let i = 0; i < arr1.length; i++) {
        
        obj1_unic[`${arr1[i]}`] = arr1[i]
    }

    for (let i = 0; i < arr2.length; i++) {
        
        obj2_unic[`${arr2[i]}`] = arr2[i]
    }

    for (let key of Object.keys(obj1_unic)) {
        let k = Number(key)
        array1_unic.push(k)
    }

    for (let key of Object.keys(obj2_unic)) {
        let k = Number(key)
        array2_unic.push(k)
    }

    // перебираю оба массива на совпадение елементов
    for (let i = 0; i < array1_unic.length; i++) {

        for (let n = 0; n < array2_unic.length; n++) {
            
            if (array1_unic[i] === array2_unic[n]) {

                res.push(array1_unic[i])
                break
            }
        }
    }

    console.log(res)
    return res
}

checkArray(array1, array2)