/*Дан массив строк. 
Написать функцию, 
которы упорядочит массив по длине строк.

Input: ["test", "education", "part", "2", "exceed.team"]

Output: ["2", "part", "test", "education", "exceed.team"]*/


function sortStr(arr) {
    let res = []
    let len_str = 0
    
    for (let i = 0; i < arr.length - 1; i++) {

        for (let j = 0; j < arr.length - i; j++) {

            if (arr[j+1] != undefined) {

                if (arr[j].length > arr[j + 1].length) {

                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                }
            }
        }
    }

    console.log(arr)
    return arr
}


sortStr(["test", "education", "part", "2", "exceed.team"])