let mass1 = [14, 53, 23, 53, 13, 55, 7, 34, 3, 6]


function getEvenIndex(array) {
    let mass2 = []
    for (let i = 0; i < mass1.length; i+=2) {
        mass2.push(array[i]);
    }
    console.log(mass2)
    return mass2
}

getEvenIndex(mass1)