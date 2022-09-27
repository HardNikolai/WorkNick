/*Дана строка. 
Написать функцию, 
которая определит, 
содержит ли строка только символы 'a', 'b', 'c' или нет.


Input: "abcbacabcbcabcbaba"
Output: true



Input: "abcbacabcqbcabcbnaba"
Output: false*/


const string1 = "abcbacabcbcabcbaba"
const string2 = "abcbacabcqbcabcbnaba"


function checkWord(str) {
    let res = ''

    for (let i = 0; i < str.length; i++) {

        if (str[i] != 'a' && str[i] != 'b' && str[i] != 'c') {
            return false
        }
    }
    return true
}

console.log(checkWord(string1))
console.log(checkWord(string2))