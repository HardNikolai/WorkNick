/*Отфильтровать коллекцию по нескольким полям. 
Функция параметрами принимает массив, первое значение -
поле с которым равно, второе значение, 
больше которого другое поле. 
Например, в коллекции мне нужно вывести значения, 
в которых возраст больше 18, а страна 'RF'.


Input: const arr = [

  {name: "test", age: 34, country: "RF"},

  {name: "test2", age: 12, country: "RF"},

  {name: "test1", age: 54, country: "RF"}

];


Output: [

  {name: "test", age: 34, country: "RF"},

  {name: "test1", age: 54, country: "RF"}

]


Пример вызова функции: func(array, "RF", 18)*/


const array1 = [

    {name: "test", age: 34, country: "RF"},
  
    {name: "test2", age: 12, country: "RF"},
  
    {name: "test1", age: 54, country: "RF"}
  
]


function filterArray(arr, conry = String, ag = Number) {
    let result = 0
    let res = []

    for (let i = 0; i < arr.length; i++) {
        
        if (arr[i].age > ag && arr[i].country === conry) {
            res.push(arr[i])
        }
    }

    console.log(res)

    return res
}


filterArray(array1, 'RF', 18)