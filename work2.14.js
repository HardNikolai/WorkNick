/*Даны две строки. 
Напишите функцию, 
которая определит, 
содержится ли меньшая по длине строка в большей.

Input: ("text education part 2", "text")
Output: true


Input: ("text education part 2", "test")
Output: false*/


const string1 = "text education part 2"
const string2 = "text"

const string3 = "text education part 2"
const string4 = "test"


function strDefinition(str1, str2) {
    let res_str = ''

    for (let i = 0; i < str2.length; i++ ) {

        for (let n = 0; n < str1.length; n++) {

            if (str2[i] === str1[n]) {
                res_str += str2[i]
                break
            }
        }
    }
    console.log(res_str === str2)

    return res_str === str2 
}


strDefinition(string1, string2)
strDefinition(string3, string4)
