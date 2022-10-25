/*Дано число, например 31. 
Проверьте, что это число не делится ни на одно другое число 
кроме себя самого и единицы. 
То есть в нашем случае нужно проверить, 
что число 31 не делится на все числа от 2 до 30. 
Если число не делится - выведите 'false', 
а если делится - выведите 'true'.

Input: 31
Output: false



Input: 4
Output: true*/


function unicNum(num) {
    let ch = 0

    for (let i = 1; i <= num; i++) {

        if (num % i === 0) {
            ch += 1
        }

        if (i === num) {

            if (ch === 2) {

                return false

            } else {

                return true
            }
        } 
    }
}

console.log(unicNum(31))
console.log(unicNum(4))