/*Напишите функцию, которая сгруппирует объекты заказов по имени.

Input: [
   {name: "test", price: 200},
   {name: "test1", price: 300},
   {name: "test", price: 100},
   {name: "test", price: 600}
]

Output: [
   {name: "test", price: 900},
   {name: "test1", price: 300}
]*/


const array1 = [
    {name: "test", price: 200},
    {name: "test1", price: 300},
    {name: "test", price: 100},
    {name: "test", price: 600}
]


function group_obj(arr) {
    let obj1 = {
      name: '',
      price: 0
    }
  
    let res_lst = []
  
  
    
        obj1['name'] =  arr[0].name
        obj1['price'] = arr[0].price  
        
        for (let n = 1; n < arr.length; n++) {
  
          if(arr[0].name === arr[n].name) {
            obj1['name'] =  arr[n].name
            obj1['price'] += arr[n].price
          }
        }
  
        res_lst.push(obj1)
  
  
        for (let n = 1; n < arr.length; n++) {
  
          if(arr[0].name != arr[n].name) {
            let obj2 = {}
  
            obj2['name'] = arr[n].name
            obj2['price'] = arr[n].price
            res_lst.push(obj2)
          }
        } 
    

    return res_lst
    }
  
  
console.log(group_obj(array1))
 