/*Реализуйте функцию, 
котора параметром принимает строку. 
Выведите сформированный объект из параметров строки браузера.

Input: "https://underscorejs.org?a=4&b=8"

Output: { a: 4, b: 8 }



Input: "https://underscorejs.org?id=123&limit=5&offset=0"

Output: { id: 123, limit: 5, offset: 0 }*/


const string1 = "https://underscorejs.org?a=4&b=8"
const string2 = "https://underscorejs.org?id=123&limit=5&offset=0"


function obgString(str) {
    let res_obj = {}
    let first_num = 0
    let work_word
    let num_start = 0
    let res1 = ''
    let res2 = ''
    let ch = 0

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '?') {
            first_num = i+1
        }
    }
    
    work_word = str.slice(first_num)

    first_num = 0


    for (let i = 0; i < work_word.length; i++) {

        if (first_num === 0) {
            
            if(work_word[i] === '&') {
           
            first_num = i
            word = work_word.slice(num_start, first_num)

            for (let n = 0; n < word.length; n++) {

                if (word[n] === '=') {
                    ch += 1
                    continue
                }

                if (ch === 0) {
                    res1 += word[n]
                } else {
                    res2 += word[n]
                }
            }

            res_obj[res1] = res2
            res1 = ''
            res2 = ''
            ch = 0
            num_start = first_num
        
            }

        } else {

            if(work_word[i] === '&') {
                
                first_num = i
                word = work_word.slice(num_start+1, first_num)

                for (let n = 0; n < word.length; n++) {

                    if (word[n] === '=') {
                        ch += 1
                        continue
                    }
    
                    if (ch === 0) {
                        res1 += word[n]
                    } else {
                        res2 += word[n]
                    }
                }
                res_obj[res1] = res2

                res1 = ''
                res2 = ''
                ch = 0
                num_start = first_num

            } else if (i === work_word.length - 1) {
                num_start = first_num + 1
                
                word = work_word.slice(num_start)

                for (let n = 0; n < word.length; n++) {

                    if (word[n] === '=') {
                        ch += 1
                        continue
                    }
    
                    if (ch === 0) {
                        res1 += word[n]
                    } else {
                        res2 += word[n]
                    }
                }

                res_obj[res1] = res2
                res1 = ''
                res2 = ''
                ch = 0
            }
        

        }
    }
    console.log(res_obj)

    return res_obj
}


obgString(string1)
obgString(string2)