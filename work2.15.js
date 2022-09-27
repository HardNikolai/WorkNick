/*Реализуйте функцию, 
которая параметрами принимает два объекта и возвращает 
сообщение равны ли эти два объекта.


Input:
const a = { test: 8, text: 9 };
const b = { test: 8, text: 9 };
func(a, b)


Output: true*/


const a = { test: 8, text: 9}
const b = { test: 8, text: 9}


function comparison(obj1, obj2) {
    let len_obj = 0

    for (let key in obj1) {
        
        if (obj1[key] != obj2[key]){
            
            return false
        }
    }

    return true
}


console.log(comparison(a, b))