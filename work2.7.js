/*Дана строка. 
Нужно написать функцию, 
которая возвращает значение true, 
если строка является палиндромом, или false если нет.


Input:"testset"

Output: true


Input: abbcsa

Output: false */


const string1 = 'testset'
const string2 = 'abbcsa'


function checkStr(str) {
    let res_str = ''

    for (let i = str.length - 1; i >= 0; i--) {
        res_str += str[i]
    }

    console.log(str === res_str)
    return str === res_str
}

checkStr(string1)
checkStr(string2)