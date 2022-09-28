/*Реализуйте функцию. 
На вход функция принимает массив значений из 0 и 1. 
Верните объект сгруппированных данных {"0": 10, "1": 5}

Input: [0, 0, 0, 1, 1, 0 , 1, 1, 1, 0, 0, 1, 1, 0, 1]

Output: {
  "0": 7,
  "1": 8
}*/


function objArray(arr) {
    let obj = {}
    let num = 0

    for (let i = 0; i < arr.length; i++) {

        for (let n = 0; n < arr.length; n++) {
            if (arr[i]===arr[n]) {
                num += 1
            }
        }
        obj[arr[i]] = num
        num = 0
    }
    console.log(obj)
    
}


objArray([0, 0, 0, 1, 1, 0 , 1, 1, 1, 0, 0, 1, 1, 0, 1])