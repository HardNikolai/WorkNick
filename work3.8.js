/*Реализовать функцию, 
которая отсортирует коллекцию по конкретному 
свойству объекта и переданному параметру (asc, desc). 
Если параметр (asc, desc) не передан, 
по умолчанию сортировка asc.

asc - это сортировка по возрастанию, 
desc -  сортировка по убыванию.

func (arr, "age", asc);

Input: const arr = [
  {name: "test", age: 34, country: "RF"},
  {name: "test2", age: 12, country: "RF"},
  {name: "test1", age: 54, country: "RF"}
]

Output: [
  {name: "test2", age: 12, country: "RF"},
  {name: "test", age: 34, country: "RF"},
  {name: "test1", age: 54, country: "RF"}
]*/


const array1 = [
  { name: "test", age: 34, country: "RF" },
  { name: "test2", age: 12, country: "RF" },
  { name: "test1", age: 54, country: "RF" }
]


function sortArray(arr, element_sort, parametr_sort) {
  let res = []
  let res1 = []
  let num = 0

  for (let i = 0; i < arr.length; i++) {

    res.push(arr[i][element_sort])

    if (i === arr.length - 1) {

      if (parametr_sort === 'desc') {

        res.sort().reverse()

      } else {

        res.sort()

      }

    }
  }

  for (let i = 0; i < res.length; i++) {

    for (let key of Object.keys(arr[num])) {

      if (res[i] === arr[num][element_sort]) {


        res1.push(arr[num])
        num = 0

        break

      } else {

        num += 1

      }
    }
  }

  console.log(res1)
  return res1

}

sortArray(array1, 'age')