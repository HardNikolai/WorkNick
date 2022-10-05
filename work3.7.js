/*Написать функцию, 
которая отфильтрует коллекцию, 
где у свойства есть хоть какое-то значение.



Input: [
  {name: "test", age: 34, country: "RF"},
  {name: "", age: null, country: ""},
  {name: "test1", age: null, country: ""},
  {name: "", age: 12, country: ""},
  {name: "", age: null, country: "RF"}
]



Output: [
  {name: "test", age: 34, country: "RF"},
  {name: "test1", age: null, country: ""},
  {name: "", age: 12, country: ""},
  {name: "", age: null, country: "RF"}
]*/


const array1 = [
    {name: "test", age: 34, country: "RF"},
    {name: "", age: null, country: ""},
    {name: "test1", age: null, country: ""},
    {name: "", age: 12, country: ""},
    {name: "", age: null, country: "RF"}
  ]


function checkElement(arr) {
    let res = []

    for (let i = 0; i < arr.length; i++) {

        for (let key of Object.keys(arr[i])) {

            if (arr[i][key]) {

                res.push(arr[i])
                break
            }
        }
    }
    console.log(res)

    return res
}

checkElement(array1)