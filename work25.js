/*Написать функцию,
принимающую на вход строку, 
написанную в стиле snake_case и возвращающую эту же строку, 
но уже в стиле camelCase.

Input: find_and_replace_element_of_array



Output: findAndReplaceElementOfArray*/


const string1 = 'find_and_replace_element_of_array'


function translateInCamel(str) {
    let result = ''
    let newWord = ''   
    let num1 = 0
    

    let arrayWords = str.split('_')
    

    for (let i = 0; i < arrayWords.length; i++ ) {
        if (num1 === 0) {
            console.log(arrayWords[i])
            result += arrayWords[i]
            num1 +=1
        } else {
            let num2 = 0
            newWord = `${arrayWords[i][num2].toUpperCase()}${arrayWords[i].slice(1,arrayWords.length+1)}`
            result += newWord
            num2 +=1
        }
    }
    console.log(result)

    return result
}

translateInCamel(string1)