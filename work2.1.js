/*Даны две строки. Сравнить строки. 
Вывести символы большей строки, 
на количество которых отличается.

Input: ("text education part 2", "text education")


Output: " part 2"*/

const string1 = "text education part 2"
const string2 = "text education"

let res_str = ''


if (string1.length > string2.length) {
    
    for (let i = 0; i < string1.length; i++) {
        if (i >= string2.length) {
            res_str += string1[i]
        }
    }
}

console.log(res_str)
 
