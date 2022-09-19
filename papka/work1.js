const mass1 = [
    { name: 'Milk', price: 20, amount: 15 }, 

    { name: 'Coffee', price: 30, amount: 17 },
   
    { name: 'Tea', price: 10, amount: 14 }
]
   

const mass2 = mass1.map(item => {
    const container = {}

    container['name'] = item.name;
    container['total'] = item.price * item.amount;

    return container
})

console.log(mass2)