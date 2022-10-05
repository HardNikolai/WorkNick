/*Функция принимает в качестве параметра строку. 
Если она начинается на 'abc', 
то заменить их на 'www', 
иначе добавить в конец строки 'zzz'.

Input: "abctestabctext"

Output: "wwwtestabctext"



Input: "testabctext"

Output: "testabctextzzz"*/


const string1 = "abctestabctext"
const string2 = "testabctext"


function wordVerification(str) {
    let res = ''

    if (str[0] === 'a' && str[1] === 'b' && str[2] === 'c') {
        res = 'www' + str.slice(3)

        console.log(res)

        return res

    } else {
        res = str.slice(0, str.length) + 'zzz'

        

        console.log(res)

        return res
    }
}


wordVerification(string1)
wordVerification(string2)