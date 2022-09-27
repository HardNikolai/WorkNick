/*Дана строка. 
Разделите строку на фрагменты по три подряд идущих символа.
В каждом фрагменте средний символ заменить на случайный символ, 
не совпадающий ни с одним из символов этого фрагмента, 
например, нижнее подчеркивание (_). 
Показать фрагменты, упорядоченные по алфавиту.

Input: "test education part 2"

Output: ["a_i", "d_c", "o_ ", "p_r", "t_2", "t_e", "t_s"]*/


const str1 = 'test education part 2'
let num = 0
let str_el = ''
let res =[]


for (let i = 0; i < str1.length; i++) {
    num += 1
    if (num === 1) {
        str_el += str1[i]
    } else if (num === 2) {
        str_el += '_'
    } else if (num === 3) {
        str_el += str1[i]
        res.push(str_el)
        num = 0
        str_el = ''
    }
}

res.sort()


console.log(res)
