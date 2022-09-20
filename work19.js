/*Написать функцию, которая принимает на вход E-mal 
в виде строки и возвращает объект вида { username, domain }

Input: “ivanov.oleg@pochta.com”


Output: {

 username: “ivanov.oleg”,

 domain: “pochta.com”

}*/

const user_mail = 'ivanov.oleg@pochta.com'


function db_user(mail) {
    let num1 = 0
    let username
    let domain
    let container = {}

    
    for (let i = 0; i < mail.length; i++) {
        if (mail[i] === '@' && num1 === 0) {
            num1 = i
            username = mail.slice(0, num1)
            domain = mail.slice(num1+1)
        }
    }
     container['username'] = username
     container['domain'] = domain

     console.log(container)

     return container
}


db_user(user_mail)