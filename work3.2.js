/*Дана строка. 
Вывести первые три символа и 
последние три символа, 
если длина строки больше 5. 
Иначе вывести первый символ столько раз, 
какова длина строки.


Input: "test education part 2"

Output: "test 2"



Input: "text"

Output: "tttt"*/


const string1 = "test education part 2"
const string2 = "text"


function strDefinition(str) {
    if (str.length > 5) {
        let res = ''

        for (let i = 0; i < 3; i++) {
            
            res += str[i]
        }

        for (let i = str.length - 3; i < str.length; i++) {
            
            res+= str[i]
        }

        console.log(res)

        return res

    }else{
        let res = ''

        for (let i = 0; i < str.length; i++) {
            res += str[0]
        }
        
        console.log(res)

        return res
    }
} 


strDefinition(string1)
strDefinition(string2)