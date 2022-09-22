/*Имеется объект {
    id: 123,
    first_name: ‘Ivan’,
    last_name: ‘Ivanov’,
    password: ’new password’,
    age: 15
   }
   
   Используя деструктуризацию, 
   создать новые переменные 
   firstName, lastName, 
   заполнив их значениями из 
   first_name, last_name объектов.*/


   const obj1 = {
    id: 123,
    first_name: 'Ivan',
    last_name: 'Ivanov',
    password: 'new password',
    age: 15
   }

   const {first_name} = {
    id: 123,
    first_name: 'Ivan',
    last_name: 'Ivanov',
    password: 'new password',
    age: 15
   }

   const {last_name} = {
    id: 123,
    first_name: 'Ivan',
    last_name: 'Ivanov',
    password: 'new password',
    age: 15
   }

   const firstName = first_name
   const lastName = last_name

   console.log(obj1)
   console.log(`firstName = ${firstName}`)
   console.log(`lastName = ${lastName}`)