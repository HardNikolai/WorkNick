let mass1 = ['a', 'b', 'c', 'd', 'e', 'f']

console.log(mass1)

function getWord(array) {
    array.reverse()

    let mass1Len = array.length
    let i = 0
    let mass2 = []
    let mass3 = []
    
    while (i < mass1Len) {
        mass2 = mass1.pop(i)
        mass3 += mass2
        i++
    }
    
    return mass3
}

console.log(getWord(mass1))