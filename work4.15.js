/*Написать функцию фильтрации коллекции, 
где у объекта есть свойство с конкретным значением.


Input: [
   {name: "test", age: 45, country: "RF", tel: "+79846466744"},
   {name: "test1", age: 23, country: "RF", tel: "+79464747484"},
   {name: "test2", age: 18, country: "RF", tel: "+376483876346"}
]

Отфильтровать значения, где age равен 23

Output: [
   {name: "test1", age: 23, country: "RF", tel: "+79464747484"}
]*/


const array1 = [
    {name: "test", age: 45, country: "RF", tel: "+79846466744"},
    {name: "test1", age: 23, country: "RF", tel: "+79464747484"},
    {name: "test2", age: 18, country: "RF", tel: "+376483876346"}
]


function sortArray(arr, element_sort, parametr_sort) {
    let res = []
    let res1 = []
    let num = 0
    
  
    for (let key of Object.keys(arr[num])) {
  
        if (parametr_sort === arr[num][element_sort]) {
  
  
          res1.push(arr[num])
          console.log(res1)
          
          return res1
  
        } else {
  
          num += 1
  
        }
    }
    
    return res1
  
}


sortArray(array1, 'age', 23)