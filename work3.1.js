/*Написать функцию, 
которая отсортирует массив чисел по возрастанию 
(asc) или убыванию (desc).

Input: [6, 43, -6, 3, 0, 5, 2, 7]

Output: [-6, 0, 2, 3, 5, 6, 7, 43]



Input: [6, 43, -6, 3, 0, 5, 2, 7]

Output: [43, 7, 6, 5, 3, 2, 0, -6]



Пример использования:
const sortElements = (arr, direction) => {
  // ....
}*/
 

const array1 = [6, 43, -6, 3, 0, 5, 2, 7]


const sortElements = (arr, direction) => {
    if (direction === 'asc') {

        for (let i = 0; i < arr.length - 1; i++) {

            for (let j = 0; j < arr.length - 1 - i; j++) {

                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j]

                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
        }    
    
        console.log(arr)
    
        return arr

    } else if (direction === 'desc') {

        for (let i = 0, endI = arr.length - 1; i < endI; i++) {

            for (let j = 0, endJ = endI - i; j < endJ; j++) {

                if (arr[j] < arr[j + 1]) {
                    let swap = arr[j]

                    arr[j] = arr[j + 1]
                    arr[j + 1] = swap
                }
            }
        }
        console.log(arr)
    
        return arr

    }
}

sortElements(array1, 'asc')
sortElements(array1, 'desc')