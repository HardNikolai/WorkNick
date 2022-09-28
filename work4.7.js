/*Дано число. Сложите его цифры. 
Если сумма получилась более 9-ти, 
опять сложите его цифры. 
И так, пока сумма не станет однозначным числом (9 и менее).


Input: 345

Output: 3*/


function sumNum(num) {
    let res = 0
    let res_string = ''
    let int_num

    num = String(num)

    for (let i = 0; i < num.length; i++) {

        int_num = Number(num[i])
        res += int_num
    }

    res_string = String(res)
    res = 0


    if (res_string.length === 1) {

        return res_string

    } else {

        return sumNum(res_string)

    }
}

console.log(sumNum(345))