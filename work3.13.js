/*Напишите функцию, 
которая преобразует массив вида 
let arr = [ 
    { name: 'width', value: 300 }, 
    { name: 'height', value: 100 } 
]; 

в объект let obj = { width: 300, height: 100 }; 

Количество объектов в массиве неограниченно.

Input: [
  {name: "width", value: 300},
  {name: "height", value: 100}
];

Output: {width: 300, height: 100}*/


const array1 = [ 
    { name: 'width', value: 300 }, 
    { name: 'height', value: 100 } 
]


function newObj(arr) {
    let obj = {}
    let array = []

    for (let i = 0; i < arr.length; i++) {
        
        for (let key of Object.keys(arr[i])) {
            array.push(arr[i][key])
        }
    }

    for (let i = 0; i < array.length; i++) {
        if (i % 2) {
            obj[array[i-1]] = array[i]
        }
    }
    
    console.log(obj)
    return obj
}


newObj(array1)